import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css'
function ProjectForm( {btnText}){
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
         name="name"
         placeholder="Digite o orçamento total"
        />
       <Select name="categoria_id" text="Selecione a categoria" />
       <SubmitButton text={btnText}/>
     </form>
    )
 }
 
 
 export default ProjectForm 