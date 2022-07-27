import PropTypes from "prop-types";
import { LinearProgress, Typography, Stack } from "@mui/material";

const Header = ({ progress }) => {
  return (
    <Stack>
      <Typography
        variant="subtitle8"
        sx={{ color: (theme) => theme.colors.blue }}
      >
        WITHDRAW FUNDS IN ADVANCE (WHEN NEEDED)
      </Typography>
      <Stack
        direction="row"
        spacing={10}
        justifyContent="center"
        alignItems="center"
      >
        <LinearProgress
          variant="determinate"
          value={parseInt(progress, 10)}
          sx={{
            backgroundColor: (theme) => theme.colors.orange,
            width: "100%",
            borderRadius: "5px",
          }}
        />
        <Typography
          variant="subtitle8"
          sx={{ cursor: "pointer" }}
          onClick={() => {}}
        >
          cancel
        </Typography>
      </Stack>
    </Stack>
  );
};

Header.propTypes = {
  progress: PropTypes.string.isRequired,
};
export default Header;
