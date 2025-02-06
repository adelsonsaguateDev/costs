import { useState, useEffect, useRef   } from 'react';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css'
function ProjectForm( { handleSubmit, btnText, projectData}){

   const [categorias, setCategorias] = useState([])
   const [projectos, setProjectos] = useState(projectData || {})
   const hasFetched = useRef(false); // Variável para verificar se já fez a requisição


   useEffect(() => {
      if (!hasFetched.current) {
        hasFetched.current = true; // Marca como já feita
        fetch('http://localhost:5000/categorias', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setCategorias(data);
          })
          .catch((error) => console.error('Error:', error));
      }
    }, []);


    const submit = (e) => {
      e.preventDefault();
      // console.log(projectos);
      handleSubmit(projectos); 
    }

    function handleChange(e){
      setProjectos({...projectos, [e.target.name]: e.target.value });
    }

    function handleCategoria(e){
      setProjectos({
        ...projectos, 
        categoria : {
          id : e.target.value,
          nome : e.target.options[e.target.selectedIndex].text,
        },
      });
    }

    return (
     <form onSubmit={submit} className={styles.form}>
        <Input
         type="text"
         text="Nome do Projecto"
         name="name"
         placeholder="Digite o nome do projecto"
         handleOnChange={handleChange}
         value={projectos.name ? projectos.name : ''} 

         />
        <Input
         type="number"
         text="Orçamento do Projecto"
         name="budget"
         placeholder="Digite o orçamento total"
         handleOnChange={handleChange}
         value={projectos.budget ? projectos.budget : ''} 

         />
       <Select 
         name="categoria_id" 
         text="Selecione a categoria" 
         options={categorias} 
         handleOnChange={handleCategoria}
         value={projectos.categoria ? projectos.categoria.id : ''} 
         />
       <SubmitButton text={btnText}/>
     </form>
    )
 }
 
 
 export default ProjectForm 