import styles from "./Projecto.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Loading from "../layout/Loading.js";
import Container from "../layout/Container.js";
function Projecto() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);

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

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
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
                  <p>form</p>
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
