import { useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import * as styles from "./styles";

// this will be an Api call
const Currency = [
  { key: "KES", currency: "1" },
  { key: "USD", currency: "2" },
];

const SelectCurrencies = () => {
  const [value, setValue] = useState("1"); // this state will change when we start pulling data from the backend
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      InputProps={{
        style: {
          ...styles.selectText,
        },
      }}
      onChange={handleChange}
      select
      size="xs"
      sx={styles.selectMenu}
      disabled
    >
      {Currency.map((item) => (
        <MenuItem key={item.key} value={value} sx={{ fontSize: "12px" }}>
          {item.currency}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectCurrencies;
