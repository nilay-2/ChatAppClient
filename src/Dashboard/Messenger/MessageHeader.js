import React from "react";
import { styled } from "@mui/system";
import Avatar from "../../shared/components/Avatar";
import { Typography } from "@mui/material";
const MainContainer = styled("div")({
  width: "98%",
  display: "column",
  marginTop: "10px",
  paddingLeft: "10px",
  paddingBottom: "20px",
});

export default function MessageHeader({ name }) {
  return (
    <MainContainer>
      <Avatar username={name} customHeight={"80px"} customWidth={"80px"} />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "white",
          marginLeft: "5px",
          marginRight: "5px",
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          color: "#b9bbbe",
          marginLeft: "5px",
          marginRight: "5px",
        }}
      >
        This is the beginning of your conversation with {name}
      </Typography>
    </MainContainer>
  );
}
