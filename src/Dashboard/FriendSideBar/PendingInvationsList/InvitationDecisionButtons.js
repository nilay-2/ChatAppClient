import React from "react";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/material";
export default function InvitationDecisionButtons({
  disabled,
  acceptInvitationHandler,
  rejectInvitationHandler,
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        style={{ color: "#fff" }}
        disabled={disabled}
        onClick={acceptInvitationHandler}
      >
        <CheckIcon />
      </IconButton>
      <IconButton
        style={{ color: "#fff" }}
        disabled={disabled}
        onClick={rejectInvitationHandler}
      >
        <ClearIcon />
      </IconButton>
    </Box>
  );
}
