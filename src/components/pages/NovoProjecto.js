import ProjectForm from '../project/ProjectForm'
import styles from './NovoProjecto.module.css'

function NovoProjecto(){
   return (
   <div className={styles.newproject_container}>
      <h1>Criar projecto</h1>
      <p>Crie o seu projecto para depois adicionar os serviços</p>
      <ProjectForm btnText="Criar Projecto" />
   </div>
   )
}


export default NovoProjecto