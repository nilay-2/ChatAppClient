import React from "react";
import { Typography } from "@mui/material";
export default function FriendsTitle({ title, align }) {
  return (
    <Typography
      align={align}
      sx={{
        textTransform: "uppercase",
        color: "#8e9297",
        fontSize: "14px",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      {title}
    </Typography>
  );
}
