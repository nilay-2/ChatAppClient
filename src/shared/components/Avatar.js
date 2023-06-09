import React from "react";
import { styled } from "@mui/system";

const AvatarPreview = styled("div")({
  height: "42px",
  width: "42px",
  background: "#5865f2",
  display: "center",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "700",
  marginLeft: "5px",
  color: "#fff",
  borderRadius: "50%",
});

export default function Avatar({
  username,
  large,
  customHeight,
  customWidth,
  fontSize,
}) {
  return (
    <AvatarPreview
      style={{
        height: `${customHeight}`,
        width: `${customWidth}`,
        fontSize: `${fontSize ? fontSize : null}`,
      }}
    >
      {username !== undefined && username !== null
        ? username.substring(0, 2)
        : ""}
    </AvatarPreview>
  );
}
