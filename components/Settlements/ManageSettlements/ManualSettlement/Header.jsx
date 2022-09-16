import PropTypes from "prop-types";
import { LinearProgress, Typography, Stack } from "@mui/material";

const Header = ({ progress, handleCancel }) => {
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
            backgroundColor: (theme) => theme.colors.mono1,
            width: "100%",
            borderRadius: "100px",
            "& .MuiLinearProgress-bar": {
              backgroundColor: (theme) => theme.colors.orange,
            },
            border: (theme) => `1px solid ${theme.colors.mono8}`,
          }}
        />
        <Typography
          variant="subtitle8"
          sx={{ cursor: "pointer" }}
          onClick={() => handleCancel()}
        >
          cancel
        </Typography>
      </Stack>
    </Stack>
  );
};

Header.propTypes = {
  progress: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
};
export default Header;
