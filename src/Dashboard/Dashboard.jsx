import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendSideBar from "./FriendSideBar/FriendSideBar";
import Messenger from "./Messenger/Messenger";
import { getActions } from "../store/actions/authActions";
import { connect } from "react-redux";
import { connectWithSocketServer } from "../realtimeCommunication/socketConnection";
import io from "socket.io-client";
// import AppBar from "./AppBar/AppBar";
const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

function Dashboard({ setUserDetails, verifyUsersBeforeEnteringDashboard }) {
  const navigate = useNavigate();

  useEffect(() => {
    const x = async () => {
      const res = await verifyUsersBeforeEnteringDashboard(navigate);
      if (res) {
        const userDetails = localStorage.getItem("user");
        if (!userDetails) {
          navigate("/login");
        } else {
          setUserDetails(JSON.parse(userDetails));
          connectWithSocketServer(JSON.parse(userDetails));
        }
      }
    };
    x();
  }, []);
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
