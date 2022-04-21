import PropTypes from "prop-types";
import { Box, Menu } from "@mui/material";
import Badge from "@mui/material/Badge";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LoadingButton from "@mui/lab/LoadingButton";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";

import { useStyles } from "./styles";
import * as styles from "./styles";

const UserDetails = ({
  handleClick,
  loadingButton,
  anchorEl,
  handleClose,
  handleLogout,
  open,
  iconColor,
}) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.userDetails}>
        <HelpCenterIcon sx={{ mr: 2, color: iconColor }} />
        <Badge
          badgeContent={3}
          sx={{
            mt: 1,
            mr: 2,
            "& .MuiBadge-badge": {
              color: "white",
              backgroundColor: "red",
            },
          }}
        >
          <NotificationsActiveIcon sx={{ color: iconColor }} />
        </Badge>

        <Box sx={{ mt: 2 }}>
          <PersonOutlineIcon
            onClick={handleClick}
            aria-expanded={open ? "true" : undefined}
            aria-controls={open ? "basic-menu" : undefined}
            sx={{ cursor: "pointer", color: iconColor }}
          />

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Box sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  cursor: "pointer",
                }}
              >
                <LoadingButton
                  onClick={handleLogout}
                  loading={loadingButton}
                  className={classes.loadingButton}
                >
                  <LogoutIcon sx={{ mr: 4 }} />
                  Log out
                </LoadingButton>
              </Box>
            </Box>
          </Menu>
        </Box>
        <Box sx={{ mt: 2, ml: 2 }}>
          <img style={styles.flagIcon} src="/KE.svg" alt="flag" />
        </Box>
      </Box>
    </>
  );
};

export default UserDetails;

UserDetails.defaultProps = {
  iconColor: "",
};

UserDetails.propTypes = {
  handleClick: PropTypes.func.isRequired,
  loadingButton: PropTypes.bool.isRequired,
  anchorEl: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  iconColor: PropTypes.string,
};
