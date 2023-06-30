import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "./store/store";
import { verifyUsersBeforeEnteringDashboard } from "./store/actions/authActions";
import { connectWithSocketServer } from "./realtimeCommunication/socketConnection";
import Login from "./authPages/LoginPage/Login";
const ProtectRoute = ({ Component }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const x = async () => {
      const res = await store.dispatch(verifyUsersBeforeEnteringDashboard());
      if (res?.verified) {
        setIsLoggedIn(true);
        connectWithSocketServer(res?.user);
      } else {
        setIsLoggedIn(false);
      }
    };
    x();
  }, []);
  return isLoggedIn ? <Component /> : <Login />;
};

export default ProtectRoute;
