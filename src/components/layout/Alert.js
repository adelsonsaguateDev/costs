import { CiWarning } from "react-icons/ci";
import styles from "./Alert.module.css";
function Alert({ type, message }) {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <p>
        <CiWarning /> {message}
      </p>
    </div>
  );
}

export default Alert;
