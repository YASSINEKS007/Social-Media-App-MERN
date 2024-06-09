import { useMediaQuery, useTheme, Box, Typography } from "@mui/material";
import Form from "../components/Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const appName = import.meta.env.VITE_APP_NAME;
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
      >
        <Typography
          fontWeight="bold"
          fontSize={isNonMobileScreens ? "36px" : "28px"}
          color={theme.palette.primary.main}
        >
          {appName}
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem", textAlign: "center" }}
          color={theme.palette.text.primary}
        >
          Welcome to {appName}
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
