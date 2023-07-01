import React, { Fragment } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./authPages/RegisterPage/Register";
import Login from "./authPages/LoginPage/Login";
import Dashboard from "./Dashboard/Dashboard";
import AlertNotification from "./shared/components/AlertNotification";
import Profile from "./UserProfile/Profile";
import { ToastContainer } from "react-toastify";
// import { verifyUsersBeforeEnteringDashboard } from "./store/actions/authActions";
// import { connectWithSocketServer } from "./realtimeCommunication/socketConnection";
// import store from "./store/store";
import ProtectRoute from "./ProtectRoute";
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectRoute>
                <Dashboard />
              </ProtectRoute>
            }
          />
          <Route path="/register" exact element={<Register />} />
          <Route
            path="/@me"
            exact
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
      <AlertNotification />
      <ToastContainer />
    </Fragment>
  );
}

export default App;

// const [isLoggedIn, setIsLoggedIn] = useState(false);
// useEffect(() => {
//   const x = async () => {
//     const res = await store.dispatch(verifyUsersBeforeEnteringDashboard());
//     if (res?.verified) {
//       console.log("verified");
//       // const userDetails = localStorage.getItem("user");
//       // if (!userDetails) {
//       //   navigate("/login");
//       // } else {
//       // setUserDetails(JSON.parse(userDetails));
//       setIsLoggedIn(true);
//       connectWithSocketServer(res?.user);
//       // }
//     } else {
//       setIsLoggedIn(false);
//     }
//   };
//   x();
// }, []);
