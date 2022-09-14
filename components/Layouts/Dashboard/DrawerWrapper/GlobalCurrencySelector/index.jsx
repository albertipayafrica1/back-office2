import { useSelector, useDispatch } from "react-redux";

import { MenuItem, TextField } from "@mui/material";

import { setGlobalCurrency } from "../../../../../redux";

import * as styles from "./styles";

const GlobalCurrencySelector = () => {
  const currencyOptions = useSelector(
    (state) => state?.currency?.currencyOptions
  );
  const selectedCurrency = useSelector(
    (state) => state?.currency?.globalCurrency
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setGlobalCurrency(e.target.value));
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
      value={selectedCurrency}
    >
      {currencyOptions.map((item) => (
        <MenuItem key={item.key} value={item.value} sx={{ fontSize: "12px" }}>
          {item.key}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default GlobalCurrencySelector;
