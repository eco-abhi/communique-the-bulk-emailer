import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px dashed black",
  boxShadow: 24,
  p: 10,
  color: "black",
  fontSize: "1116px",
};

export const ModalComp = ({
  modalTitle,
  modalContent,
  openMod,
  setOpenMod,
}) => {
  //   const [openMod, setOpenMod] = useState(true);
  const handleClose = () => setOpenMod(false);

  return (
    <div>
      <Modal
        open={openMod}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h3" component="h1">
            {modalTitle}
          </Typography>
          <Typography id="modal-description" variant="h4" sx={{ mt: 6 }}>
            {modalContent}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
