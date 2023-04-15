import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  width: "fit-content",
  marginLeft: "10px",
  padding: "5px",
});

export default function UserName({ name }) {
  return (
    <Wrapper>
      <Typography
        variant="subtitle1"
        sx={{ color: "#fff", fontWeight: "bold", letterSpacing: "1px" }}
      >
        {name
          ? name.split("")[0].toUpperCase() +
            name.slice(1, name.length).toLowerCase()
          : ""}
      </Typography>
    </Wrapper>
  );
}
