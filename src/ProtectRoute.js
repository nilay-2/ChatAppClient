import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "./store/store";
import { verifyUsersBeforeEnteringDashboard } from "./store/actions/authActions";
import { connectWithSocketServer } from "./realtimeCommunication/socketConnection";
import AppLoader from "./shared/components/AppLoader";
const ProtectRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const x = async () => {
      const res = await store.dispatch(
        verifyUsersBeforeEnteringDashboard(navigate)
      );
      if (res?.verified) {
        setIsLoggedIn(true);
        connectWithSocketServer(res?.user);
      } else {
        setIsLoggedIn(false);
      }
    };
    x();
  }, []);
  if (isLoggedIn) {
    return children;
  }
  return <AppLoader />;
};

export default ProtectRoute;
