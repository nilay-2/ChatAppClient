import * as api from "../../api";
import { openAlertMessage } from "./alertActions";
import { devFrontEndUrl, prodFrontEndUrl } from "../../shared/utils/url";
export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
  SET_PROFILE_PIC: "SET_PROFILE_PIC",
  SET_NAME_AND_EMAIL: "SET_NAME_AND_EMAIL",
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails, navigate) =>
      dispatch(register(userDetails, navigate)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
    verifyUsersBeforeEnteringDashboard: () =>
      dispatch(verifyUsersBeforeEnteringDashboard()),
    logout: () => dispatch(logout()),
    setProfilePic: (url) => dispatch(setProfilePic(url)),
    updatePFP: (photoUrl) => dispatch(updatePFP(photoUrl)),
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
      // localStorage.setItem("user", JSON.stringify(user));

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
      // localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUserDetails(user));
      // navigate("/dashboard");
      navigate("/");
    }
  };
};

const logout = () => {
  return async (dispatch) => {
    // localStorage.removeItem("user");
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

export const verifyUsersBeforeEnteringDashboard = () => {
  return async (dispatch) => {
    const response = await api.protectRoute();
    if (response.error) {
      console.log("verification failed", response);
      dispatch(openAlertMessage(response.expection.response.data?.message));
      console.log(response);
      return { verified: false };
    } else {
      // console.log(response);
      dispatch(setUserDetails(response.data?.user));
      // dispatch(openAlertMessage("authentication process was successful"));
      return { verified: true, user: response.data?.user };
    }
  };
};

const setProfilePic = (url) => {
  return {
    type: authActions.SET_PROFILE_PIC,
    url,
  };
};

const updatePFP = (photoUrl) => {
  return async (dispatch) => {
    const response = await api.updatePFP(photoUrl);
    console.log(response);
    if (response.error) {
      console.log(response.exception);
    } else {
      dispatch(setUserDetails(response.data?.user));
    }
  };
};

export const updateCredentials = (data) => {
  return async (dispatch) => {
    const response = await api.updateNameAndEmail(data);
    return response;
  };
};

export const updateNameAndEmailReduxStore = (data) => {
  return {
    type: authActions.SET_NAME_AND_EMAIL,
    data,
  };
};
