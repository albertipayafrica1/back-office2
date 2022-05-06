import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Dialog from "../../atoms/Dialog/index";
import { Country } from "./data";
import { styles } from "./styles";

const SelectCountryDialog = () => {
  const [country, setCountry] = useState("");
  const router = useRouter();

  const handleFormChange = (event) => {
    setCountry(event.target.country);

    if (
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "localhost"
    ) {
      router.push(
        `http://${window.location.hostname}:3000?country=${event.target.value}`
      );
    } else {
      router.push(`${window.location.hostname}?country=${event.target.value}`);
    }
  };

  return (
    <Dialog
      open
      position={styles.dialogueContainer}
      paperPropsStyling={{ position: "absolute", top: "0px" }}
    >
      <Box sx={styles.selectCountryContainer}>
        <Typography sx={styles.selectCountryText} variant="title2">
          Select country to proceed
        </Typography>

        <FormControl sx={styles.formController}>
          <InputLabel id="country">-Select-</InputLabel>
          <Select
            labelId="Country"
            id="country"
            name="country"
            value={country}
            label="Select"
            onChange={handleFormChange}
          >
            {Country.map((name) => (
              <MenuItem
                sx={{ fontSize: "small" }}
                key={name.id}
                value={name.country}
              >
                <ListItemIcon>
                  <Image src={name.src} alt="logo" width={20} height={20} />
                </ListItemIcon>

                {name.country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Dialog>
  );
};

export default SelectCountryDialog;
