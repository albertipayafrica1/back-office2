import PropTypes from "prop-types";

import { Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Header = ({ toggleCreateUser }) => {
  return (
    <Stack
      direction="row"
      alignItem="center"
      justifyContent="space-between"
      sx={{ pl: 6, pb: 6, pr: 6 }}
    >
      <Typography variant="subtitle4">Add User</Typography>
      <CloseIcon
        sx={{ fontSize: "20px", cursor: "pointer" }}
        onClick={toggleCreateUser}
      />
    </Stack>
  );
};

Header.propTypes = {
  toggleCreateUser: PropTypes.func.isRequired,
};

export default Header;
