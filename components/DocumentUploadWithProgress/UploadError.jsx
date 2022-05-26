import PropTypes from "prop-types";
import { LinearProgress, Typography } from "@mui/material";

import FileHeader from "./FileHeader";

const UploadError = ({ file, onDelete, errors }) => {
  return (
    <>
      <FileHeader file={file} onDelete={onDelete} progress={0} />
      <LinearProgress
        variant="determinate"
        value={0}
        sx={{ backgroundColor: (theme) => theme.colors.errorRed }}
      />

      {errors.map((error) => (
        <div key={error.code}>
          <Typography
            variant="subtitle2"
            sx={{
              color: (theme) => theme.colors.errorRed,
              mt: 1,
            }}
          >
            {error.message}
          </Typography>
        </div>
      ))}
    </>
  );
};

UploadError.propTypes = {
  file: PropTypes.shape({}).isRequired,
  onDelete: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf({}).isRequired,
};

export default UploadError;
