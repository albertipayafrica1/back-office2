import Image from "next/image";

import { Box } from "@mui/material";

import * as styles from "./styles";

const Carousel = () => {
    return (
        <Box sx={styles.imageContainer}>
            <Image
                src="/login-banner.png"
                alt="Login Banner"
                layout="fill"
                objectFit="cover"
            />
        </Box>
    );
};

export default Carousel;
