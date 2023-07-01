import React, { useState } from "react";
import "../css/userProfileForm.css";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { getActions } from "../store/actions/authActions";
import { connect } from "react-redux";
const Wrapper = styled("div")({
  padding: "10px",
});
const UpdatePassword = ({ updatePassword, setUserDetails }) => {
  const [passwordCred, setPasswordCred] = useState({
    origPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e) => {
    setPasswordCred((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearPassInput = () => {
    setPasswordCred({
      origPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const updatePasswordHandler = async () => {
    const { origPassword, newPassword, confirmPassword } = passwordCred;
    console.log(origPassword, newPassword, confirmPassword);
    if (!origPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required!");
      clearPassInput();
      return;
    }
    if (
      (!origPassword.length > 6 && !origPassword.length < 12) ||
      (!newPassword.length > 6 && !newPassword.length < 12) ||
      (!confirmPassword.length > 6 && !confirmPassword.length < 12)
    ) {
      toast.error("Password must be have atleast 6 and atmost 12 characters!");
      clearPassInput();
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password must match!");
      clearPassInput();
      return;
    }
    if (newPassword === origPassword) {
      toast.error("Current and new password must be different!");
      clearPassInput();
      return;
    }
    const response = await updatePassword(passwordCred);
    if (response.error) {
      clearPassInput();
      toast.error("Please try again later!");
      return;
    } else if (response.data.status === "success") {
      const user = response.data?.user;
      const token = response.data?.token;
      // setUserDetails({
      //   _id: user._id,
      //   email: user.email,
      //   name: user.name,
      //   photo: user.photo,
      //   token,
      // });
      clearPassInput();
      toast.success("Password updated successfully");
      return;
    }
  };

  return (
    <Wrapper>
      <div className="update-pass-header">UPDATE YOUR PASSWORD</div>
      <div className="input-field">
        <label className="input-field-label">current password</label>
        <input
          type="password"
          id="ogpassword"
          placeholder="• • • • • • • •"
          className="password-input auth-update-input"
          onChange={onChangeHandler}
          name="origPassword"
          value={passwordCred.origPassword}
        />
      </div>
      <div className="input-field">
        <label className="input-field-label">New password</label>
        <input
          id="newpassword"
          type="password"
          placeholder="• • • • • • • •"
          className="password-input auth-update-input"
          onChange={onChangeHandler}
          name="newPassword"
          value={passwordCred.newPassword}
        />
      </div>
      <div className="input-field">
        <label className="input-field-label">Confirm password</label>
        <input
          id="confirmpassword"
          type="password"
          placeholder="• • • • • • • •"
          className="password-input auth-update-input"
          onChange={onChangeHandler}
          name="confirmPassword"
          value={passwordCred.confirmPassword}
        />
      </div>
      <div className="submit-btn">
        <Button
          variant="contained"
          color="success"
          onClick={updatePasswordHandler}
        >
          UPDATE PASSWORD
        </Button>
      </div>
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(UpdatePassword);
