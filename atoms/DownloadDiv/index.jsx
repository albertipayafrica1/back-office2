import Link from "next/link";

import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";

import { styles } from "./styles";

const DownloadDiv = ({ text, downloadUrl }) => {
  return (
    <a
      href={downloadUrl}
      download
      rel="noopener noreferrer"
      target="_blank"
      style={styles.TextLink}
    >
      <Box sx={styles.container}>
        <Box sx={styles.LinksContainer}>
          <img src="/download.svg" alt="download" />
        </Box>

        <Box sx={styles.TitleContainer}>
          <Link href={downloadUrl}>
            <Typography variant="subtitle3" sx={styles.TextLink}>
              {text}
            </Typography>
          </Link>
        </Box>
      </Box>
    </a>
  );
};
export default DownloadDiv;

DownloadDiv.propTypes = {
  text: PropTypes.string.isRequired,
  downloadUrl: PropTypes.string.isRequired,
};
