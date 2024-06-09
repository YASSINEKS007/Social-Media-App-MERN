import { Box, useMediaQuery } from "@mui/material";
import UserWidget from "../widgets/UserWidget";
import { useSelector } from "react-redux";

function ProfilePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <div>
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId={_id}
            picturePath={picturePath}
          />
        </Box>
    </div>
  );
}

export default ProfilePage;
