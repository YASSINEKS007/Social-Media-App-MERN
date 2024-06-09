import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SettingsPage from "./Pages/SettingsPage";
import MessagesPage from "./Pages/MessagesPage";
import NotificationsPage from "./Pages/NotificationsPage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuthorized = useSelector((state) => state.token !== null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          />

          <Route
            path="/home"
            element={isAuthorized ? <HomePage /> : <Navigate to="/" />}
          />

          <Route
            path="/profile/:userId"
            element={isAuthorized ? <ProfilePage /> : <Navigate to="/" />}
          />

          <Route
            path="/settings/:userId"
            element={isAuthorized ? <SettingsPage /> : <Navigate to="/" />}
          />

          <Route
            path="/messages/:userId"
            element={isAuthorized ? <MessagesPage /> : <Navigate to="/" />}
          />

          <Route
            path="/notifications/:userId"
            element={isAuthorized ? <NotificationsPage /> : <Navigate to="/" />}
          />

          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
