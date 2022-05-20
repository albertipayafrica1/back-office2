import PropTypes from "prop-types";
import { Stack, Box, IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const FileHeader = ({ file, onDelete }) => {
  return (
    <Stack justifyContent="space-between" alignItems="center" direction="row">
      <Box>
        <Typography variant="subtitle4">{file.path} </Typography>
      </Box>
      <Box item>
        <IconButton size="small" onClick={() => onDelete(file)}>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};

FileHeader.propTypes = {
  file: PropTypes.shape({ path: PropTypes.string }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FileHeader;
