import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  const backendHost = import.meta.env.backendHost;
  <Box
    width={size}
    height={size}
  >
    <img
      style={{ objectFit: "cover", borderRadius: "50%" }}
      width={size}
      height={size}
      src={`${backendHost}/${image}`}
    />
  </Box>;
};

export default UserImage;