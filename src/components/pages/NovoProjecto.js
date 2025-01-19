import { useNavigate  } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './NovoProjecto.module.css'

function NovoProjecto(){


   const navigate = useNavigate(); // Utilizamos o history para redirecionar para a lista de projetos
   
   function createPost(projecto){
             //inicializar o cost e services
      projecto.cost = 0
      projecto.services = []
       
      
      fetch('http://localhost:5000/projectos', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(projecto),
 
       })
         .then((response) => response.json())
         .then((data) => {
           console.log(data)
           //redirect
           navigate('/projectos', { state: { message: 'Projecto criado com sucesso!' } });

         })
         .catch((error) => console.error('Error:', error));
     
   }
   
   return (
   <div className={styles.newproject_container}>
      <h1>Criar projecto</h1>
      <p>Crie o seu projecto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projecto" />
   </div>
   )
}


export default NovoProjecto