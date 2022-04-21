import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Drawer,
  Typography,
  Collapse,
  ListItemText,
  List,
  LinearProgress,
  Button,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Home, Transaction, MainMenu, Product, General } from "./data";
import * as styles from "./styles";
import { useStyles } from "./styles";

const DrawerWrapper = ({ mobileOpen, handleDrawerToggle }) => {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const classes = useStyles();
  const router = useRouter();
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const drawer = (
    <div>
      <Box sx={{ mt: "10px" }}>
        <Box className={classes.activateAccount}>
          <Link href="/dashboard/kyc">
            <Typography
              variant="caption2"
              className={
                router.pathname === "/dashboard/kyc"
                  ? `${classes.activeActivateAccountitle}`
                  : `${classes.activateAccountTitle}`
              }
            >
              Activate account
            </Typography>
          </Link>

          <LinearProgress variant="determinate" value={progress} />
          <Typography className={classes.activateAccountTitle}>
            50% complete
          </Typography>

          <Typography className={classes.menuText}>MAIN MENU</Typography>

          <Box sx={{ mt: 5, pb: 30 }}>
            <Box>
              {Home.map((item) => (
                <Button
                  startIcon={<img src={item.icon} alt={item.name} />}
                  variant="contained"
                  disabled={false}
                  className={
                    router.pathname === `${item.url}`
                      ? `${classes.activeMenuItem}`
                      : `${classes.menuItems}`
                  }
                >
                  <ListItemText disableTypography ListItemText>
                    <Link href={item.url}>
                      <Typography sx={{ mr: "40px" }} variant="caption2">
                        {item.name}
                      </Typography>
                    </Link>
                  </ListItemText>
                </Button>
              ))}
            </Box>

            <Box>
              <List>
                <Button
                  variant="contained"
                  disabled
                  onClick={handleClick}
                  className={
                    router.pathname === "/dashboard/transaction"
                      ? `${classes.activeMenuItem}`
                      : `${classes.menuItems}`
                  }
                >
                  <img
                    className={classes.icon}
                    src="/transaction 1.svg"
                    alt="home"
                  />
                  <Box
                    sx={{ width: "100%" }}
                    disable
                    variant="contained"
                    className={
                      router.pathname === "/dashboard/transaction"
                        ? `${classes.activeMenuItem}`
                        : `${classes.menuItems}`
                    }
                  >
                    Transactions
                  </Box>
                  {open ? (
                    <ExpandLessIcon className={classes.expandIcon} />
                  ) : (
                    <ExpandMoreIcon className={classes.expandIcon} />
                  )}
                </Button>

                <Collapse in={open} timeout="auto" unmountOnExit>
                  {Transaction.map((item) => (
                    <>
                      <Button
                        sx={{ mt: 1, ml: 4 }}
                        variant="contained"
                        disabled={false}
                        className={
                          router.pathname === `${item.url}`
                            ? `${classes.activeMenuItem}`
                            : `${classes.menuItems}`
                        }
                      >
                        <ListItemText>
                          <Link href={item.url}>
                            <Typography sx={{ mr: "30px" }} variant="caption2">
                              {item.name}
                            </Typography>
                          </Link>
                        </ListItemText>
                      </Button>
                    </>
                  ))}
                </Collapse>
              </List>
              {MainMenu.map((item) => (
                <>
                  <Button
                    sx={{ mt: 3 }}
                    variant="contained"
                    disabled={false}
                    className={
                      router.pathname === `${item.url}`
                        ? `${classes.activeMenuItem}`
                        : `${classes.menuItems}`
                    }
                  >
                    <img
                      className={classes.MenuIcon}
                      src={item.icon}
                      alt={item.name}
                    />

                    <ListItemText>
                      <Link href={item.url}>
                        <Typography sx={{ mr: "30px" }} variant="caption2">
                          {item.name}
                        </Typography>
                      </Link>
                    </ListItemText>
                  </Button>
                </>
              ))}

              <Typography className={classes.productText} variant="title9">
                PRODUCTS
              </Typography>

              {Product.map((item) => (
                <>
                  <Button
                    sx={{ mt: 3 }}
                    variant="contained"
                    disabled={false}
                    className={
                      router.pathname === `${item.url}`
                        ? `${classes.activeMenuItem}`
                        : `${classes.menuItems}`
                    }
                  >
                    <img
                      className={classes.MenuIcon}
                      src={item.icon}
                      alt={item.name}
                    />
                    <ListItemText>
                      <Link href={item.url}>
                        <Typography sx={{ mr: "30px" }} variant="caption2">
                          {item.name}
                        </Typography>
                      </Link>
                    </ListItemText>
                  </Button>
                </>
              ))}

              <Typography className={classes.productText}>GENERAL</Typography>
              {General.map((item) => (
                <>
                  <Button
                    sx={{ mt: 3 }}
                    variant="contained"
                    disabled={false}
                    className={
                      router.pathname === `${item.url}`
                        ? `${classes.activeMenuItem}`
                        : `${classes.menuItems}`
                    }
                  >
                    <img
                      className={classes.MenuIcon}
                      src={item.icon}
                      alt={item.name}
                    />
                    <ListItemText>
                      <Link href={item.url}>
                        <Typography sx={{ mr: "30px" }} variant="caption2">
                          {item.name}
                        </Typography>
                      </Link>
                    </ListItemText>
                  </Button>
                </>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={styles.temporaryDrawer}
      >
        {drawer}
      </Drawer>

      <Drawer variant="permanent" sx={styles.permanentDrawer} open>
        {drawer}
      </Drawer>
    </>
  );
};

export default DrawerWrapper;

DrawerWrapper.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};
