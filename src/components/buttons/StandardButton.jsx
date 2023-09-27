import styles from "./standardbutton.module.css";

export const StandardButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.standardButton}>
      {children}
    </button>
  );
};
