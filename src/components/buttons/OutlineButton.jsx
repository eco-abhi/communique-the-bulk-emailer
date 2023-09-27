import styles from "./outlinebutton.module.css";

export const OutlineButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.outlineButton}>
      {children}
    </button>
  );
};
