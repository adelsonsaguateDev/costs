import { useState, useEffect, useRef   } from 'react';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css'
function ProjectForm( {btnText}){

   const [categorias, setCategorias] = useState([])
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

    return (
     <form className={styles.form}>
        <Input
         type="text"
         text="Nome do Projecto"
         name="name"
         placeholder="Digite o nome do projecto"
        />
        <Input
         type="number"
         text="Orçamento do Projecto"
         name="budget"
         placeholder="Digite o orçamento total"
        />
       <Select 
         name="categoria_id" 
         text="Selecione a categoria" 
         options={categorias} 
         />
       <SubmitButton text={btnText}/>
     </form>
    )
 }
 
 
 export default ProjectForm 