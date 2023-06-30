import React from "react";
import { styled } from "@mui/system";
import ProfileHeader from "./ProfileHeader";
import ProfilePic from "./ProfilePic";
import ProfileDetails from "./ProfileDetails";
import LineBreak from "../shared/components/LineBreak";
import UpdatePassword from "./UpdatePassword";
import store from "../store/store";
const ProfileWrapper = styled("div")({
  maxWidth: "100vw",
  height: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  paddingTop: "50px",
  backgroundColor: "#2f3136",
});

const ProfileContainer = styled("div")({
  width: "45%",
  maxWidth: "900px",
  height: "fit-content",
  padding: "10px",
});

const Profile = () => {
  return (
    <ProfileWrapper>
      <ProfileContainer>
        <ProfileHeader />
        <ProfilePic />
        <ProfileDetails />
        <LineBreak />
        <UpdatePassword />
      </ProfileContainer>
    </ProfileWrapper>
  );
};

export default Profile;
