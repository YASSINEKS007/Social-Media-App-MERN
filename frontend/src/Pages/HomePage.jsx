import Navbar from "../components/NavBar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import MyPostWidget from "../widgets/MyPostWidget";
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { picturePath } = useSelector((state) => state.user);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Navbar />
      <Box
        width="80%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "block" : "block"}
        gap="0.5rem"
        justifyContent={isNonMobileScreens ? "space-between" : "center"}
        alignItems={isNonMobileScreens ? "flex-start" : "center"}
      >
        <Box
          flexBasis={isNonMobileScreens ? "42%" : "100%"}
          mt={isNonMobileScreens ? undefined : "2rem"}
          textAlign={isNonMobileScreens ? "left" : "center"}
        >
          <MyPostWidget picturePath={picturePath} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
