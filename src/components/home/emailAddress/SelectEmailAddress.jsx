import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedEmailAddress } from "../../../redux/slices/userSelectedEmailAddressSlice";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#111111",
    border: "2px solid #0DFF9D",
    fontSize: 16,
    padding: "10px 10px 0px 20px",
    // transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Arial"],
  },
}));

export function SelectEmailAddress() {
  const selectedValue = useSelector((state) => state.getSelectedEmailAddress);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(getSelectedEmailAddress(event.target.value));

    // Scroll to the next input window
    setTimeout(function () {
      // Used setTimeout as it wasn't working otherwise
      document.getElementById("select-email-type").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-email-address-label" style={{ color: "#EBECF3" }}>
        Email Address
      </InputLabel>

      <Select
        labelId="select-email-address-label"
        id="select-email-address"
        value={selectedValue === null ? "" : selectedValue}
        label="Email Address"
        onChange={handleChange}
        style={{ color: "#EBECF3" }}
        input={<BootstrapInput />}
      >
        <MenuItem value={"supplieroperations@rivian.com"}>
          SupplierOperations@rivian.com
        </MenuItem>
        <MenuItem value={"scaanalytics@rivian.com"}>
          SCAAnalytics@rivian.com
        </MenuItem>
      </Select>
    </FormControl>
  );
}
