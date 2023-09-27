import "./CCAndBCCButtons.css";

export const CCAndBCCButtons = ({
  ccButtonVisibility,
  bccButtonVisibility,
  onClickCC,
  onClickBCC,
}) => {
  return (
    <>
      <button
        style={{ display: { ccButtonVisibility } }}
        onClick={onClickCC}
        className="cc-button"
      >
        CC
      </button>
      <button
        style={{ display: { bccButtonVisibility } }}
        onClick={onClickBCC}
        className="bcc-button"
      >
        BCC
      </button>
    </>
  );
};
