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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AppBar from "./AppBar/AppBar";
import "../App.css";
const Wrapper = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  minHeight: "100vh",
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
      <ToastContainer />
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
