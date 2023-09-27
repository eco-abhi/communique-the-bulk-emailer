import "./CCAndBCCButtons.css";

export const CCButton = ({ onClickCC }) => {
  return (
    <>
      <button onClick={onClickCC} className="cc-button">
        CC
      </button>
    </>
  );
};
