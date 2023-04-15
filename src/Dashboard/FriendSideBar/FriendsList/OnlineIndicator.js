import React from "react";
import { Box } from "@mui/system";
import { FiberManualRecord } from "@mui/icons-material";
export default function OnlineIndicator() {
  return (
    <Box
      sx={{
        color: "#3ba55d",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: "5px",
      }}
    >
      <FiberManualRecord />
    </Box>
  );
}
