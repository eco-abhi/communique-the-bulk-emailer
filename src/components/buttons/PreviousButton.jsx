import "./PreviousButton.css";

export const PreviousButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="prevButton">
      {children}
    </button>
  );
};
