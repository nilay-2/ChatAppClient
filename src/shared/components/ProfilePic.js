import React from "react";
import { styled } from "@mui/system";

const AvatarPreview = styled("img")({
  display: "block",
  height: "42px",
  width: "42px",
  //   background: "#5865f2",
  fontWeight: "700",
  marginLeft: "5px",
  borderRadius: "50%",
});

export default function ProfilePic({ userDetails }) {
  return <AvatarPreview src={userDetails?.photo}></AvatarPreview>;
}
