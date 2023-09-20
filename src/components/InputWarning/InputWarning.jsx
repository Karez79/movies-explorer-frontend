import styles from "./InputWarning.module.css";

const InputWarning = ({ prop }) => (
  <p className={styles["register__form-warning"]}>{prop} </p>
);

export default InputWarning;
