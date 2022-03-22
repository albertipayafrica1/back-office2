import { useState } from "react";
import Link from "next/link";
import { Box, Grid, Typography, Button } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import Carousel from "../atoms/Curousel";
import BookDemoDialog from "../components/BookDemoDialog";
import CallMeDialog from "../components/CallMeDialog";
import SelectContryDialog from "../components/SelectContryDialog";

import { homedata, SocialMediaLinks } from "../homedata";
import { styles } from "../styles/Home";

const Home = () => {
  const [page, SetPage] = useState(0);
  const matches = useMediaQuery("(min-width:1000px)");
  const HandleSelectedPage = (index) => {
    SetPage(index);
  };

  const perPage = homedata[page];
  // dialog state
  const [bookDemo, setbookDemo] = useState(false);
  const [callDemo, setcallMeDemo] = useState(false);
  const [countrySelect, setCountry] = useState(false);

  const handleToggleBookDemo = () => {
    setbookDemo(!bookDemo);
  };

  const handleToggleCallMeDemo = () => {
    setcallMeDemo(!callDemo);
  };

  const handleTogglecountrySelect = () => {
    setCountry(!countrySelect);
  };

  return (
    <div
      style={
        matches
          ? styles.backgroundImage
          : { backgroundColor: perPage.backcolor }
      }
    >
      <Grid container spacing={2}>
        {/** hide background-image when on Mobile/tablet */}
        <Box sx={styles.backgroundImage}>
          {/* {matches ? ( */}
          <Carousel
            imageArray={perPage.ArrayImage}
            onChange={HandleSelectedPage}
          />
          {/* ) : null} */}
        </Box>
        <Grid item md={6} xs={12}>
          <Box sx={styles.gatewayContainer}>
            {perPage.titleText.map((details) => {
              return (
                <>
                  {details.id === 2 ? (
                    <Typography
                      key={details.id}
                      variant="title1"
                      style={{ color: details.color }}
                      sx={styles.headerText}
                    >
                      {details.Text}
                    </Typography>
                  ) : (
                    <Typography
                      key={details.id}
                      variant="title1"
                      style={{ color: details.color }}
                      sx={styles.headerText}
                    >
                      {details.Text}
                    </Typography>
                  )}
                </>
              );
            })}

            {perPage.title.map((title) => (
              <Typography
                style={{
                  color: perPage.title[0].color,
                  padding: " 10px 10px 10px 0px",
                }}
                component="h4"
              >
                {title.text}
              </Typography>
            ))}
          </Box>

          <SelectContryDialog
            handleToggleSelectCountry={handleTogglecountrySelect}
            open={countrySelect}
          />
          <Box sx={styles.SelectContryContainer}>
            <Button
              onClick={handleTogglecountrySelect}
              style={{
                color: perPage.bottombtn[0].color,
                backgroundColor: perPage.bottombtn[0].backcolor,
              }}
              variant="white"
            >
              Select country of opearation to login
            </Button>
          </Box>
        </Grid>

        <BookDemoDialog
          handleToggleBookDemo={handleToggleBookDemo}
          open={bookDemo}
        />
        <CallMeDialog
          handleToggleCallMeDemo={handleToggleCallMeDemo}
          open={callDemo}
        />

        <Grid item md={6} xs={12}>
          <Box sx={styles.battonContainer2}>
            <Button
              onClick={handleToggleBookDemo}
              variant="orange-demo"
              sx={{
                backgroundColor: perPage.Topbutton[0].backcolor,
                color: perPage.Topbutton[0].color,
              }}
            >
              BOOK A DEMO
            </Button>
            <Button
              onClick={handleToggleCallMeDemo}
              variant="orange-demo"
              sx={{
                backgroundColor: perPage.Topbutton[0].backcolor,
                color: perPage.Topbutton[0].color,
              }}
            >
              CALL ME
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box sx={styles.IconsContainer}>
        <Typography style={styles.icon}>Follow</Typography>

        {SocialMediaLinks.map((link) => (
          <Link key={link.id} href={link.href} passHref>
            <a target="_blank">
              <link.icon style={styles.icon} />
            </a>
          </Link>
        ))}
      </Box>
    </div>
  );
};

export default Home;
