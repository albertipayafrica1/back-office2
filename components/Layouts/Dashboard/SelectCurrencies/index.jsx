import { useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import * as styles from "./styles";

// this will be an Api call
const Currency = [
  { key: "KES", value: "1" },
  { key: "USD", value: "2" },
];

const SelectCurrencies = () => {
  const [value, setValue] = useState("1"); // this state will change when we start pulling data from the backend
  const handleChange = (event) => {
    console.log(event.target.value, "event");
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
      disabled
      select
      size="xs"
      sx={styles.selectMenu}
      value={value}
    >
      {Currency.map((item) => (
        <MenuItem key={item.key} value={item.value} sx={{ fontSize: "12px" }}>
          {item.key}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectCurrencies;
