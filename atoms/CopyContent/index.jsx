import React from "react";

import { Stack, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CopyContent = () => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ marginTop: "158px", height: "30px" }}
    >
      <IconButton
        size="large"
        onClick={() => {
          navigator.clipboard.writeText("");
        }}
        sx={{
          height: "5px",
          width: "5px",
        }}
      >
        <ContentCopyIcon
          sx={{
            fontSize: "15px",
            color: (theme) => theme.colors.orange,
            cursor: "pointer",
          }}
        />
      </IconButton>
    </Stack>
  );
};

export default CopyContent;
