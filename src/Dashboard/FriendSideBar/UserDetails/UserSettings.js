import React from "react";
import { styled } from "@mui/system";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Wrapper = styled("div")({
  width: "100px",
  marginLeft: "auto",
});

export default function UserSettings() {
  const navigate = useNavigate();

  const handleProfileRedirect = () => {
    navigate("/@me");
  };

  return (
    <Wrapper>
      <Tooltip title="User settings">
        <IconButton
          sx={{ display: "block", marginLeft: "auto" }}
          onClick={handleProfileRedirect}
        >
          <SettingsIcon sx={{ color: "#999DA0" }} />
        </IconButton>
      </Tooltip>
    </Wrapper>
  );
}
