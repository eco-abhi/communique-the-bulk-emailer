import "./BCCButton.css";

export const BCCButton = ({ onClickBCC }) => {
  return (
    <>
      <button onClick={onClickBCC} className="bcc-button">
        BCC
      </button>
    </>
  );
};
