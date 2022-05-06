import { useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import * as styles from "./styles";

// this will be an Api call
const Currency = [
  { key: 1, currency: "KES" },
  { key: 2, currency: "USD" },
  { key: 3, currency: "TZ" },
  { key: 4, currency: "UGX" },
];

const SelectCurrencies = () => {
  const [value, setValue] = useState(""); // this state will change when we start pulling data from the backend
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
    >
      {Currency.map((item) => (
        <MenuItem
          key={item.key}
          value={item.currency}
          sx={{ fontSize: "12px" }}
        >
          {item.currency}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectCurrencies;
