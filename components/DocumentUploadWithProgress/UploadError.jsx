import PropTypes from "prop-types";
import { LinearProgress, Typography } from "@mui/material";

import FileHeader from "./FileHeader";

const UploadError = ({ file, onDelete, errors }) => {
  // console.log(errors[0].error.message, "errors");
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
          <Typography color="error">{error.message}</Typography>
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
