import { useState, useEffect, useRef } from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./ProjectForm.module.css";
function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categorias, setCategorias] = useState([]);
  const [projectos, setProjectos] = useState(projectData || {});
  const hasFetched = useRef(false); // Variável para verificar se já fez a requisição
  const [errors, setErrors] = useState({}); //Variavel para controlar erros de validação no form

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true; // Marca como já feita
      fetch("http://localhost:5000/categorias", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCategorias(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, []);

  const submit = (e) => {
    e.preventDefault();

    // Validação dos campos
    const newErrors = {};

    if (!projectos.name || projectos.name.trim() === "") {
      newErrors.name = "O nome do projecto é obrigatório.";
    }

    if (!projectos.budget || projectos.budget <= 0) {
      newErrors.budget = "O orçamento deve ser maior que zero.";
    }

    if (!projectos.categoria || !projectos.categoria.id) {
      newErrors.categoria = "Selecione uma categoria.";
    }

    // Se houver erros, atualize o estado e não prossiga
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Se não houver erros, limpe as mensagens e envie o formulário
    setErrors({});
    handleSubmit(projectos);
  };

  function handleChange(e) {
    setProjectos({ ...projectos, [e.target.name]: e.target.value });
    // Limpa o erro do campo ao alterar
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function handleCategoria(e) {
    setProjectos({
      ...projectos,
      categoria: {
        id: e.target.value,
        nome: e.target.options[e.target.selectedIndex].text,
      },
    });
    // Limpa o erro da categoria ao alterar
    setErrors({ ...errors, categoria: "" });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Projecto"
        name="name"
        placeholder="Digite o nome do projecto"
        handleOnChange={handleChange}
        value={projectos.name ? projectos.name : ""}
      />
      {errors.name && <span className={styles.error}>{errors.name}</span>}
      <Input
        type="number"
        text="Orçamento do Projecto"
        name="budget"
        placeholder="Digite o orçamento total"
        handleOnChange={handleChange}
        value={projectos.budget ? projectos.budget : ""}
      />
      {errors.budget && <span className={styles.error}>{errors.budget}</span>}
      <Select
        name="categoria_id"
        text="Selecione a categoria"
        options={categorias}
        handleOnChange={handleCategoria}
        value={projectos.categoria ? projectos.categoria.id : ""}
      />
      {errors.categoria && <span className={styles.error}>{errors.categoria}</span>}
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
