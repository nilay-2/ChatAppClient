import { Tooltip } from "@mui/material";
import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
const getFormValidMessage = () => "Press to register";
const getFormNotValidMessage = () =>
  "Username must have min 3 characters and max 12 characters, password must have min 6 characters and max 12 characters";

export default function RegisterPageFooter({ isFormValid, handleRegister }) {
  const navigate = useNavigate();
  const handlePushToLoginPage = () => {
    navigate("/login");
  };
  return (
    <>
      <Tooltip
        title={isFormValid ? getFormValidMessage() : getFormNotValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Log in"
            additionalStyles={{ marginTop: "30px" }}
            disabled={isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Already have an account? "
        redirectText="Login"
        additionalStyles={{ marginTop: "10px" }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
}
