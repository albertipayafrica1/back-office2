import { useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import {
  ListSubheader,
  List,
  Collapse,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import * as styles from "./styles";

const MenuList = ({ itemList }) => {
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
      sx={{ pb: 0 }}
    >
      <Button
        onClick={handleClick}
        sx={
          router.pathname.includes("/dashboard/settings")
            ? styles.activeListItem
            : styles.listItem
        }
      >
        {itemList.icon}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Typography sx={styles.itemMenuText}>{itemList.name}</Typography>
          {open ? <ExpandLess /> : <ExpandMore />}
        </Stack>
      </Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {itemList.dropDown.map((item) => (
            <Button
              key={item.id}
              sx={
                router.pathname === `${item.url}`
                  ? { ...styles.activeListItem, pl: 5 }
                  : { ...styles.listItem, pl: 5 }
              }
              onClick={() => {
                return router.push(`${item.url}`);
              }}
            >
              {item.icon}
              <Typography sx={styles.itemMenuText} key={item.id}>
                {item.name}
              </Typography>
            </Button>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

MenuList.propTypes = {
  itemList: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    dropDown: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        icon: PropTypes.node.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

export default MenuList;
