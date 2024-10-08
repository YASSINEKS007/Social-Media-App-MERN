import {
  Close,
  DarkMode,
  Help,
  LightMode,
  Menu,
  Message,
  Notifications,
  Search,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  ClickAwayListener,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout, setMode } from "../state/main";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const [notificationCount, setNotificationCount] = useState(0); 

  const fullName = `${user.firstName} ${user.lastName}`;
  const notifications = ["notification 1", "notification 2"]; 

  const handleClickAway = () => {
    setIsNotificationsOpen(false);
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    // Reset notification count when opening notifications panel
    if (!isNotificationsOpen) {
      setNotificationCount(0);
    }
  };
  return (
    <FlexBetween
      padding="0.5rem 2%"
      width={"100%"}
      backgroundColor={alt}
    >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          {import.meta.env.VITE_APP_NAME}
        </Typography>
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box position="relative">
              <IconButton onClick={handleNotificationsToggle}>
                <Notifications sx={{ fontSize: "25px" }} />
                {notificationCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: -5,
                      right: -5,
                      backgroundColor: "red",
                      borderRadius: "50%",
                      padding: "5px",
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    {notificationCount}
                  </span>
                )}
              </IconButton>
              {isNotificationsOpen && (
                <Paper
                  elevation={3}
                  style={{ zIndex: "20" }}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    width: "300px",
                    mt: 1,
                    p: 2,
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <Typography variant="h6">Notifications</Typography>
                  {notifications.map((notification, index) => (
                    <React.Fragment key={index}>
                      <Box mt={1}>
                        <Typography>{notification}</Typography>
                      </Box>
                      {index !== notifications.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                  {notifications.length === 0 && (
                    <Box mt={1}>
                      <Typography>No new notifications</Typography>
                    </Box>
                  )}
                </Paper>
              )}
            </Box>
          </ClickAwayListener>
          <FormControl
            variant="standard"
            value={fullName}
          >
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 0.5rem",
                display: "flex",
                alignItems: "center",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  p: "0.25rem 0.5rem",
                },
              }}
              input={<InputBase />}
              renderValue={(selected) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <UserImage
                    image={user.picturePath}
                    size="20px"
                  />
                  <Typography style={{ marginLeft: "10px" }}>
                    {selected}
                  </Typography>
                </div>
              )}
            >
              <MenuItem
                value={fullName}
                onClick={() => navigate(`/profile/${userId}`)}
              >
                <UserImage
                  image={user.picturePath}
                  size="20px"
                />
                <Typography style={{ marginLeft: "8px" }}>Profile</Typography>
              </MenuItem>
              <MenuItem
                value="Messages"
                onClick={() => navigate(`/messages/${userId}`)}
              >
                <MessageIcon style={{ marginRight: 8 }} />
                <Typography>Messages</Typography>
              </MenuItem>
              <MenuItem
                value="Notifications"
                onClick={() => navigate(`/notifications/${userId}`)}
              >
                <NotificationsIcon style={{ marginRight: 8 }} />
                <Typography>Notifications</Typography>
              </MenuItem>
              <MenuItem
                value="Settings"
                onClick={() => navigate(`/settings/${userId}`)}
              >
                <SettingsIcon style={{ marginRight: 8 }} />
                <Typography>Settings</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <LightModeIcon style={{ marginRight: 8 }} />
                ) : (
                  <DarkModeIcon style={{ marginRight: 8 }} />
                )}
                <Typography>
                  {theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
                </Typography>
              </MenuItem>

              <MenuItem
                value="Help"
                onClick={() => navigate(`/help`)}
              >
                <HelpOutlineIcon style={{ marginRight: 8 }} />
                <Typography>Help</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                <LogoutIcon style={{ marginRight: 8 }} />
                <Typography>Log Out</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box
            display="flex"
            justifyContent="flex-end"
            p="1rem"
          >
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl
              variant="standard"
              value={fullName}
            >
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem
                  value={fullName}
                  onClick={() => navigate(`/profile/${userId}`)}
                >
                  <AccountCircleIcon style={{ marginRight: 8 }} />
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  value="Messages"
                  onClick={() => navigate(`/messages/${userId}`)}
                >
                  <MessageIcon style={{ marginRight: 8 }} />
                  <Typography>Messages</Typography>
                </MenuItem>
                <MenuItem
                  value="Notifications"
                  onClick={() => navigate(`/notifications/${userId}`)}
                >
                  <NotificationsIcon style={{ marginRight: 8 }} />
                  <Typography>Notifications</Typography>
                </MenuItem>
                <MenuItem
                  value="Settings"
                  onClick={() => navigate(`/settings/${userId}`)}
                >
                  <SettingsIcon style={{ marginRight: 8 }} />
                  <Typography>Settings</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setMode())}>
                  {theme.palette.mode === "dark" ? (
                    <LightModeIcon style={{ marginRight: 8 }} />
                  ) : (
                    <DarkModeIcon style={{ marginRight: 8 }} />
                  )}
                  <Typography>
                    {theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
                  </Typography>
                </MenuItem>

                <MenuItem
                  value="Help"
                  onClick={() => navigate(`/help`)}
                >
                  <HelpOutlineIcon style={{ marginRight: 8 }} />
                  <Typography>Help</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  <LogoutIcon style={{ marginRight: 8 }} />
                  <Typography>Log Out</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
