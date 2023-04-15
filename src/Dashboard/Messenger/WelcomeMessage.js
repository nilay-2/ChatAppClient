import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const Wrapper = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function WelcomeMessage() {
  return (
    <Wrapper>
      <Typography variant="subtitle1" sx={{ color: "#808080" }}>
        Start a conversation
      </Typography>
    </Wrapper>
  );
}
