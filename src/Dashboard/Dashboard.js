import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendSideBar from "./FriendSideBar/FriendSideBar";
import Messenger from "./Messenger/Messenger";
import { getActions } from "../store/actions/authActions";
import { connect } from "react-redux";
import { connectWithSocketServer } from "../realtimeCommunication/socketConnection";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
const Wrapper = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  minHeight: "100vh",
});

function Dashboard({ setUserDetails, verifyUsersBeforeEnteringDashboard }) {
  return (
    <Wrapper>
      <SideBar />
      <FriendSideBar />
      <Messenger />
    </Wrapper>
  );
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Dashboard);
