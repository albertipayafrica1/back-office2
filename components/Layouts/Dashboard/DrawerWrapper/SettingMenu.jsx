import { useState } from "react";
import { useRouter } from "next/router";

import {
  ListSubheader,
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  ListItem,
  Collapse,
  Typography,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import BadgeIcon from "@mui/icons-material/Badge";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

import * as styles from "./styles";

const userManagementPages = [
  {
    icon: <SupervisorAccountIcon />,
    title: "Users",
    link: "/users",
  },
  {
    icon: <BadgeIcon />,
    title: "Roles",
    link: "/roles",
  },
  {
    icon: <SocialDistanceIcon />,
    title: "Permissions",
    link: "/permissions",
  },
];

const UserManagementFrame = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={<ListSubheader component="div" id="nested-list-subheader" />}
    >
      <ListItemButton
        onClick={handleClick}
        sx={router.pathname === "" ? styles.activeMenuItem : styles.menuItem}
      >
        <ManageAccountsIcon />

        <Typography sx={styles.itemMenuText}>settings</Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {userManagementPages.map((page) => (
            // <MenuItem paddingLeft={4} key={page.title} page={page} />
            <ListItem disablePadding>
              <ListItemButton
                sx={
                  router.pathname === ""
                    ? styles.activeMenuItem
                    : styles.menuItem
                }
              >
                {page.icon}
                <Typography sx={styles.itemMenuText}>{page.title}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default UserManagementFrame;
