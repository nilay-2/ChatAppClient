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
        bottom: "-4px",
        right: "-4px",
      }}
    >
      <FiberManualRecord fontSize="small" />
    </Box>
  );
}
