import styles from "./Projecto.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
function Projecto() {
  const { id } = useParams();

  const [project, setProject] = useState([]);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;

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
    }
  }, [id]);

  return <p>{project.name}</p>;
}

export default Projecto;
