import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const RedirectText = styled("span")({
  color: "#00aff4",
  fontWeight: "500",
  cursor: "pointer",
});

export default function RedirectInfo({
  redirectText,
  redirectHandler,
  additionalStyles,
  text,
}) {
  return (
    <Typography
      variant="subtitle2"
      sx={{
        color: "#72767d",
      }}
      style={additionalStyles ? additionalStyles : {}}
    >
      {text}
      <RedirectText onClick={redirectHandler}> {redirectText}</RedirectText>
    </Typography>
  );
}
