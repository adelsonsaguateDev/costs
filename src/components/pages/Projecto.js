import { parse, v4 as uuidv4 } from "uuid";
import styles from "./Projecto.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Loading from "../layout/Loading.js";
import Container from "../layout/Container.js";
import Message from "../layout/Message.js";
import Alert from "../layout/Alert.js";
import ProjectForm from "../project/ProjectForm.js";
import ServiceForm from "../service/ServiceForm.js";
import ServiceCard from "../service/ServiceCard.js";

function Projecto() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
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
            setServices(data.services);
          })
          .catch((error) => console.log(error)());
      }, 1000);
    }
  }, [id]);

  function editPost(project) {
    setMessage("");
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projecto!");
      setType("error");
      return false;
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
        setType("success");
      })
      .catch((error) => console.log(error)());
  }

  function createService() {
    setMessage("");

    //last service
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)) {
      setMessage(
        "Por favor, o orçamento não deve ser ultrapassado, verifique o valor do serviço"
      );
      setType("error");
      project.services.pop();
      return false;
    }

    //adicionar o custo total, aos projectos
    project.cost = newCost;

    //actualizar os projectos

    fetch(`http://localhost:5000/projectos/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowServiceForm(false);
      })
      .catch((error) => console.log(error)());
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;
    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projectos/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((response) => response.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage("Serviço removido com sucesso!");
        setType("success");
      })
      .catch((error) => console.log(error)());
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
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
            <div className={styles.service_form_container}>
              <h2>Adicone um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {showServiceForm ? "Fechar" : "Adiconar serviço"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    descricao={service.descricao}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && (
                <Alert type="info" message="Nenhum serviço encontrado!" />
              )}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Projecto;
