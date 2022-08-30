import { Box } from "@mui/material";

import CarouselAtom from "../../../atoms/Carousel";

import * as styles from "./styles";

const Carousel = () => {
  // get this image array from server
  const imageArray = [
    { id: 1, src: "/login-banner.png", alt: "Ipay" },
    // { id: 2, src: "/login-banner2.png", alt: "Ipay" },
  ];
  return (
    <Box sx={styles.imageContainer}>
      <CarouselAtom imageArray={imageArray} onChange={() => {}} />
    </Box>
  );
};

export default Carousel;
