import { useState, useEffect } from "react";
import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  const backendHost = import.meta.env.VITE_BACKEND_HOST;
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${backendHost}/photos/${image}`);
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageData(imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();
  }, [backendHost, image]);

  return (
    <Box
      width={size}
      height={size}
    >
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        src={imageData || `${backendHost}/${image}`}
        alt="User"
      />
    </Box>
  );
};

export default UserImage;
