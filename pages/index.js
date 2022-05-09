import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Typography,
  Button,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";

import { makeStyles } from "@mui/styles";
import backgroundImage from "../public/ipay-landing-background.png";

import WatchDemoDialog from "../components/WatchDemoDialog";
import { getCountryIconLinkLandingPage } from "../utils/countryOfOperation";
import ContactSalesDialog from "../components/ContactSalesDialog";
import { Country } from "../data";
import { styles } from "../styles/Home";
import useForm from "../hooks/useForm";

const useStyles = makeStyles(() => ({
  icon: {
    fill: "white",
  },
}));

const Home = () => {
  const [demo, setDemo] = useState(false);
  const [sale, setSales] = useState(false);
  const router = useRouter();

  //  const { country } = router.query;

  const classes = useStyles();

  const [formData, handleFormChange] = useForm({ countrySelector: "KE" });

  useEffect(() => {
    handleFormChange({
      target: { name: "countrySelector", value: router.query.country },
    });
  }, [router.query.country]);

  const countryLink = getCountryIconLinkLandingPage(formData.countrySelector);

  const handleCreateAccount = () => {
    router.push(
      `/createAccount?country=${formData.countrySelector}&rc=RC000000`
    );
  };

  const handleLogin = () => {
    router.push(`login?country=${formData.countrySelector}`);
  };

  const toggleDemo = () => {
    setDemo(!demo);
  };
  const toggleSale = () => {
    setSales(!sale);
  };

  return (
    <Box>
      <AppBar sx={styles.AppBar}>
        <Box sx={styles.logoContainer}>
          <Image src={countryLink} alt="Logo" width={78} height={39} />
        </Box>
        <Box sx={styles.loginContainer}>
          <Box>
            <FormControl sx={styles.formControler}>
              <Select
                className={classes.select}
                sx={styles.select}
                id="countrySelector"
                name="countrySelector"
                value={formData.countrySelector}
                onChange={handleFormChange} // add change domain logic
                renderValue={(value) => {
                  return (
                    <Box sx={{ display: "flex", gap: 3 }}>
                      <Image
                        src={`/${value}.svg`}
                        alt="logo"
                        width={20}
                        height={20}
                      />
                      {value}
                    </Box>
                  );
                }}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                  },
                }}
              >
                {Country.map((name) => (
                  <MenuItem
                    sx={{ fontSize: "small" }}
                    key={name.id}
                    value={name.country}
                  >
                    <ListItemIcon>
                      <Image src={name.src} alt="logo" width={20} height={20} />
                    </ListItemIcon>

                    {name.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Button onClick={handleLogin} sx={styles.yellowText}>
              LOGIN
            </Button>
          </Box>
          <Divider sx={styles.divider} orientation="vertical" />
          <Box>
            <Button onClick={toggleSale} sx={styles.yellowText}>
              CONTACT SALES
            </Button>
          </Box>
        </Box>
      </AppBar>

      <Box sx={styles.mainContainer}>
        <Box sx={styles.innerContainer}>
          <Typography sx={styles.mainText} variant="title9">
            Accept payments and disburse funds securely accross multiple
            channels. Explore limitless opportunities to
            <span style={styles.expandText}> expand </span> your business today.{" "}
          </Typography>

          <WatchDemoDialog open={demo} toggleWatchDemo={toggleDemo} />
          <ContactSalesDialog open={sale} toggleSales={toggleSale} />
          <Box sx={styles.buttonsContainer}>
            <Button
              onClick={handleCreateAccount}
              sx={styles.createAccountButton}
              variant="yellowOrange"
            >
              CREATE AN ACCOUNT
            </Button>
            <Button
              onClick={toggleDemo}
              sx={styles.watchDemoButton}
              variant="yellowBorder"
            >
              WATCH DEMO
              <img
                style={{ marginLeft: "10px" }}
                src="/Polygon 1.svg"
                alt="next"
              />
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ zIndex: -1 }}>
        <Image
          alt="backgroundimg"
          src={backgroundImage}
          quality={65}
          layout="fill"
          objectFit="cover"
        />
      </Box>
    </Box>
  );
};

export default Home;
