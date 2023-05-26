import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./authPages/RegisterPage/Register";
import Login from "./authPages/LoginPage/Login";
import Dashboard from "./Dashboard/Dashboard";
import AlertNotification from "./shared/components/AlertNotification";
import Loading from "./shared/components/Loading";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/" exact element={<Dashboard />} />
          {/*<Route path="/loading" exact element={<Loading />} />*/}
        </Routes>
      </Router>
      <AlertNotification />
    </>
  );
}

export default App;
