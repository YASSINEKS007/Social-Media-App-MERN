import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import UserWidget from "../widgets/UserWidget";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";

function ProfilePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { userId } = useParams();
  const [data, setData] = useState(null);
  const backendHost = import.meta.env.VITE_BACKEND_HOST;
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${backendHost}/users/${userId}`,{
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileData();
  }, [userId]); 

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <NavBar />
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
          {data && (
            <UserWidget
              userId={userId}
              picturePath={data.picturePath}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilePage;
