function ProjectForm(){
    return (
     <form>
        <div>
            <input type="text" placeholder="Digite o nome do projecto"/>
        </div>
        <div>
            <input type="number" placeholder="Digite o orçamento total"/>
        </div>
        <div>
            <select name="categoria_id">
              <option disabled>--Selecione a categoria--</option>
            </select>
        </div>
        <div>
            <input type="submit" value="Criar projecto"/>
        </div>
     </form>
    )
 }
 
 
 export default ProjectForm