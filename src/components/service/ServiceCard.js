import styles from "../project/ProjectCard.module.css";
import {BsFillTrashFill} from 'react-icons/bs'

function ServiceCard({ id, name, cost, descricao, handleRemove }) {
  const remove = (e) => {
    e.preventDefault()
    handleRemove(id, cost)
  }
    return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Custo total:</span> {cost} MT
      </p>
      <p>{descricao}</p>
      <div className={styles.project_card_actions}>
        <button onClick={remove}>
            <BsFillTrashFill />
            Remover
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
