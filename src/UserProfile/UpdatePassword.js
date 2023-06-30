import React from "react";
import "../css/userProfileForm.css";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
const Wrapper = styled("div")({
  padding: "10px",
});
const UpdatePassword = () => {
  return (
    <Wrapper>
      <div className="update-pass-header">UPDATE YOUR PASSWORD</div>
      <div className="input-field">
        <label htmlFor="" className="input-field-label">
          current password
        </label>
        <input
          type="password"
          placeholder="• • • • • • • •"
          className="password-input auth-update-input"
        />
      </div>
      <div className="input-field">
        <label htmlFor="" className="input-field-label">
          New password
        </label>
        <input
          type="password"
          placeholder="• • • • • • • •"
          className="password-input auth-update-input"
        />
      </div>
      <div className="input-field">
        <label htmlFor="" className="input-field-label">
          Confirm password
        </label>
        <input
          type="password"
          placeholder="• • • • • • • •"
          className="password-input auth-update-input"
        />
      </div>
      <div className="submit-btn">
        <Button variant="contained" color="success">
          UPDATE PASSWORD
        </Button>
      </div>
    </Wrapper>
  );
};

export default UpdatePassword;
