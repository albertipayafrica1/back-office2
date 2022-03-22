import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Box,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import useForm from "../../hooks/useForm";
import { countryOfOperationCode } from "../../utils/countryOfOperation";
import Dialog from "../../atoms/Dialog/index";
import { Country } from "./data";
import { styles } from "./styles";

const SelectContryDialog = ({ open, handleToggleSelectCountry }) => {
  const [formData, handleFormChange] = useForm({
    country: "",
  });

  const router = useRouter();

  const handleSubmit = () => {
    const code = countryOfOperationCode(formData.country);
    router.push(`login?country=${code}`);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleToggleSelectCountry}
        position={styles.dialogueContainer}
      >
        <div style={styles.Container}>
          <Box sx={styles.selectCountryContainer}>
            <Typography variant="title2">
              SELECT COUNTRY OF OPERATION
            </Typography>

            <FormControl sx={styles.formControler}>
              <InputLabel id="country">Country</InputLabel>
              <Select
                labelId="Country"
                id="country"
                name="country"
                value={formData.country}
                label="country"
                onChange={handleFormChange}
              >
                {Country.map((name) => (
                  <MenuItem key={name.id} value={name.country}>
                    <Image width="20" height="15" alt="map" src={name.src} />
                    {name.country}
                  </MenuItem>
                ))}
              </Select>
              <Button
                onClick={handleSubmit}
                disabled={formData.country === ""}
                sx={styles.submit}
                variant="blue"
              >
                Submit
              </Button>
            </FormControl>
          </Box>
        </div>
      </Dialog>
    </div>
  );
};

export default SelectContryDialog;

SelectContryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleToggleSelectCountry: PropTypes.func.isRequired,
};
