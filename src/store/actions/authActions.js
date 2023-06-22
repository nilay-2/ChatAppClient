import * as api from "../../api";
import { openAlertMessage } from "./alertActions";
import { devFrontEndUrl, prodFrontEndUrl } from "../../shared/utils/url";
export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails, navigate) =>
      dispatch(register(userDetails, navigate)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
    verifyUsersBeforeEnteringDashboard: (navigate) =>
      dispatch(verifyUsersBeforeEnteringDashboard(navigate)),
    logout: () => dispatch(logout()),
  };
};

export const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

const login = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await api.login(userDetails);
    if (response.error) {
      dispatch(openAlertMessage(response.exception.response.data?.message));
    } else {
      const { user, token } = response?.data;
      user.token = token;
      // console.log(user);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setUserDetails(user));
      // navigate("/dashboard");
      navigate("/");
    }
  };
};

const register = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await api.register(userDetails);
    if (response.error) {
      dispatch(openAlertMessage(response.exception.response.data?.message));
    } else {
      const { user, token } = response?.data;
      user.token = token;
      // console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUserDetails(user));
      // navigate("/dashboard");
      navigate("/");
    }
  };
};

const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("user");
    const response = await api.logout();
    if (response.error) {
      dispatch(openAlertMessage(response.exception.response.data?.message));
    } else {
      dispatch(openAlertMessage(response.data?.message));
      window.location.href = `${
        process.env.NODE_ENV === "development"
          ? devFrontEndUrl
          : prodFrontEndUrl
      }/login`;
    }
  };
};

const verifyUsersBeforeEnteringDashboard = (navigate) => {
  return async (dispatch) => {
    const response = await api.protectRoute();
    if (response.error) {
      // console.log(response);
      dispatch(openAlertMessage(response.expection.response.data?.message));
      navigate("/login");
      return false;
    } else {
      dispatch(openAlertMessage("authentication process was successful"));
      return true;
    }
  };
};
