import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import Container from "../layout/Container";
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";

import styles from "./Projectos.module.css";
function Projectos() {
  const [projects, setProjects] = useState([]);
  const [hideLoader, setHideLoader] = useState(false);

  const location = useLocation();
  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  const hasFetched = useRef(false); // Variável para verificar se já fez a requisição

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true; // Marca como já feita
      setTimeout(() => { //Usado para fazer o loader levar mais tempo
        fetch("http://localhost:5000/projectos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setProjects(data);
            setHideLoader(true);
          })
          .catch((error) => console.log(error)());
      }, 2000);
    }
  }, []);

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Projectos</h1>
        <LinkButton to="/novoprojecto" text="Criar Projecto" />
      </div>
      <div className={styles.total}>
        <h2>Total: {projects.length}</h2>
      </div>

      {message && <Message type="success" msg={message} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.categoria?.nome || "Sem Categoria"}
              key={project.id}
            />
          ))}
        {!hideLoader && <Loading />}
        {hideLoader &&  projects.length === 0 && (
          <p>Nenhum projecto encontrado.</p>
        )}
      </Container>
    </div>
  );
}

export default Projectos;
