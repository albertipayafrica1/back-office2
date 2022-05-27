import { Component } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Divider, Slide } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import * as styles from "./styles";

const data = [
  {
    id: 1,
    type: "refund",
    title: "You have a new Refund Confirmation Request",
    body: "Transaction ID - QAD0JC7W3C KSH 100.00 MPESA",
    date: "Today at 7:45 AM",
    link: "",
  },
  {
    id: 2,
    type: "discover",
    title: "Introducing Payment Links",
    body: "You can now share payment links of your products on your social media platforms..",
    link: "",
  },
  {
    id: 3,
    type: "refund",
    title: "You have a new Refund Confirmation Request",
    body: "Transaction ID - QAD0JC7W3C KSH 100.00 MPESA",
    link: "",
    date: "Today at 7:45 AM",
  },
  {
    id: 2,
    type: "discover",
    title: "Introducing Payment Links",
    body: "You can now share payment links of your products on your social media platforms..",
    link: "",
  },
  {
    id: 3,
    type: "refund",
    title: "You have a new Refund Confirmation Request",
    body: "Transaction ID - QAD0JC7W3C KSH 100.00 MPESA",
    link: "",
    date: "Today at 7:45 AM",
  },
  {
    id: 4,
    type: "refund",
    title: "You have a new Refund Confirmation Request",
    body: "Transaction ID - QAD0JC7W3C KSH 100.00 MPESA",
    link: "",
    date: "Today at 7:45 AM",
  },
  {
    id: 5,
    type: "refund",
    title: "You have a new Refund Confirmation Request",
    body: "Transaction ID - QAD0JC7W3C KSH 100.00 MPESA",
    link: "",
    date: "Today at 7:45 AM",
  },
];

const NotificationDrawer = ({
  open,
  toggleNotificationDrawer,
  containerRef,
}) => {
  return (
    <Slide direction="left" in={open} container={containerRef.current}>
      <Box sx={styles.notificationContainer}>
        <Box sx={styles.notification}>
          <Typography sx={styles.notificationText}>NOTIFICATIONS</Typography>
          <ArrowRightAltIcon
            onClick={toggleNotificationDrawer}
            sx={styles.arrowIcon}
          />
        </Box>

        <Divider sx={{ width: "100%" }} />

        {data.length === 0 ? (
          <Box sx={{ maxHeight: "100%" }}>
            <Typography sx={styles.emptyNotificationText}>
              No new notifications
            </Typography>
          </Box>
        ) : (
          <Box sx={styles.bodyContainer}>
            {data.map((notification) => {
              return (
                <>
                  <Box
                    key={notification.id}
                    sx={styles.notificationContentContainer}
                  >
                    {notification.type === "refund" ? (
                      <img
                        src="/notificationmessage.svg"
                        alt="icon"
                        style={styles.notificationIcon}
                      />
                    ) : (
                      <img
                        src="/newproduct.svg"
                        alt="icon"
                        style={styles.notificationIcon}
                      />
                    )}

                    <Box onClick={() => {}} sx={styles.notificationContent}>
                      <Typography
                        variant="title10"
                        sx={
                          notification.type === "refund"
                            ? styles.refundTitle
                            : styles.discoverTitle
                        }
                      >
                        {notification.title}
                      </Typography>

                      <Typography variant="title10" sx={styles.bodyText}>
                        {notification.body}
                      </Typography>
                      <Typography variant="title10" sx={styles.date}>
                        {notification.date}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ width: "100%" }} />
                </>
              );
            })}
          </Box>
        )}

        {data.length === 0 ? null : (
          <Box style={styles.viewAllContainer}>
            <Typography sx={styles.viewAllText}> View All </Typography>
          </Box>
        )}
      </Box>
    </Slide>
  );
};

export default NotificationDrawer;

NotificationDrawer.propTypes = {
  toggleNotificationDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Component) }),
  ]).isRequired,
};
