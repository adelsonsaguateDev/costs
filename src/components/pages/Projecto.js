import styles from "./Projecto.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Loading from "../layout/Loading.js";
import Container from "../layout/Container.js";
import ProjectForm from "../project/ProjectForm.js";
import Message from "../layout/Message.js";
function Projecto() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;

      setTimeout(() => {
        fetch(`http://localhost:5000/projectos/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setProject(data);
          })
          .catch((error) => console.log(error)());
      }, 1000);
    }
  }, [id]);

  function editPost(project) {
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projecto!");
      setType("error")
      return false
    }

    fetch(`http://localhost:5000/projectos/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("O projecto actualizado com sucesso!");
        setType("success")
      })
      .catch((error) => console.log(error)());
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projecto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar projecto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span>{" "}
                    {project.categoria?.nome || "Sem Categoria"}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span> {project.budget} MT
                  </p>
                  <p>
                    <span>Total de Utilizado:</span> {project.cost} MT
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Projecto;
