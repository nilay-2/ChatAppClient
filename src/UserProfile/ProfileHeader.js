import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Wrapper = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "5px",
});

const ProfileHeader = () => {
  const navigate = useNavigate();
  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      <Typography variant="h5" color="white" fontWeight="bold">
        My Account
      </Typography>
      <IconButton onClick={handleHomeRedirect}>
        <CancelIcon sx={{ color: "#b9bbbe" }} fontSize="large" />
      </IconButton>
    </Wrapper>
  );
};

export default ProfileHeader;
