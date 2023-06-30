import { authActions } from "../actions/authActions";

const initialState = {
  userDetails: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    case authActions.SET_PROFILE_PIC:
      console.log(action.url);
      const updatedUserDetails = { ...state.userDetails, photo: action.url };
      return {
        ...state,
        userDetails: updatedUserDetails,
      };
    case authActions.SET_NAME_AND_EMAIL:
      const updatedCredentials = {
        ...state.userDetails,
        name: action.data?.name,
        email: action.data?.email,
      };
      return {
        ...state,
        userDetails: updatedCredentials,
      };
    default:
      return state;
  }
};

export default authReducer;
