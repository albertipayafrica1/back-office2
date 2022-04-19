// import React, { useEffect } from "react";
// import { makeStyles } from "@mui/styles";
// import clsx from "clsx";
// import Drawer from "@mui/material/Drawer";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import AppsIcon from "@mui/icons-material/Apps";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";

import React from "react";
import CreateAccountOtpDialog from "../../components/CreateAccountOtpDialog";
import Search from "../../atoms/Search";

// const drawerWidth = 240;
// const transitionDuration = 1000; // can also use theme.transitions.duration

// const useStyles = makeStyles(() => {
//   return {
//     menuButton: {
//       marginRight: (theme) => theme.spacing(2),
//     },
//     hide: {
//       display: "none",
//     },
//     appBar: {
//       zIndex: (theme) => theme.zIndex.drawer + 1,
//     },
//     drawer: {
//       width: (theme) => theme.drawerWidth,
//       "& .MuiBackdrop-root": {
//         display: "none",
//       },
//     },
//     drawerPaper: {
//       width: (theme) => theme.drawerWidth,
//       backgroundColor: "rgba(120, 120, 120, 0.2)",
//     },
//     content: {
//       padding: (theme) => theme.spacing(3),
//       transition: (theme) =>
//         theme.transitions.create("margin", {
//           easing: theme.transitions.easing.easeOut,
//           duration: transitionDuration,
//         }),
//       minWidth: (theme) => theme.drawerWidth,
//       marginLeft: (theme) => 0,
//     },
//     contentShift: {
//       transition: (theme) =>
//         theme.transitions.create("margin", {
//           easing: theme.transitions.easing.easeOut,
//           duration: transitionDuration,
//         }),
//       minWidth: (theme) => theme.drawerWidth,
//       marginLeft: (theme) => theme.drawerWidth,
//     },
//   };
// });

// export default function ClippedDrawer() {
//   const theme = useTheme();
//   const greaterThan375 = useMediaQuery("(min-width:376px)");
//   theme.drawerWidth = greaterThan375 ? drawerWidth : "100%";
//   const classes = useStyles(theme);
//   const [open, setOpen] = React.useState(greaterThan375);

//   useEffect(() => {
//     setOpen(greaterThan375);
//   }, [greaterThan375]);

//   const handleMenuClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <div>
//       {/* fixed is default */}
//       <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <IconButton // hide on desktop
//             color="inherit"
//             onClick={handleMenuClick}
//             edge="start"
//             className={clsx(classes.menuButton, greaterThan375 && classes.hide)}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap>
//             Drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         // add full width for responsive
//         className={classes.drawer}
//         variant="temporary"
//         // elevation={3} only works with variant="temporary"
//         open={open}
//         transitionDuration={{
//           enter: transitionDuration,
//           exit: transitionDuration,
//         }}
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//         PaperProps={{ elevation: 1 }}
//         ModalProps={{ zindex: -10 }}
//       >
//         <Toolbar />
//         <div>
//           <List>
//             {["Home", "Page 1", "Page 2", "Page 3"].map((text, index) => (
//               <ListItem
//                 button
//                 key={text}
//                 onClick={() => {
//                   console.log("buttonclicked");
//                 }}
//               >
//                 <ListItemIcon>
//                   <AppsIcon />
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItem>
//             ))}
//           </List>
//         </div>
//       </Drawer>
//       <main className={clsx(classes.content, { [classes.contentShift]: open })}>
//         <Toolbar />
//         <Typography>hello</Typography>
//       </main>
//     </div>
//   );
// }

// otpn1

function index(props) {
  const paperPropsStyling = {
    position: "absolute",
    m: 0,
    top: 10,
    left: 50,
  };
  return (
    // <div>
    //   <CreateAccountOtpDialog
    //     open
    //     backDropVisible
    //     paperPropsStyling={paperPropsStyling}
    //   />
    // </div>
    <Search />
  );
}

export default index;
