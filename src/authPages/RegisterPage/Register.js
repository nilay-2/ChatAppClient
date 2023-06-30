import AuthBox from "../../shared/components/AuthBox";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RegisterPageInputs from "./RegisterPageInputs";
import RegisterPageFooter from "./RegisterPageFooter";
import { validateRegisterForm } from "../../shared/utils/validateForm";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions";
const Register = ({ register }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsFormValid(validateRegisterForm({ email, name, password }));
  }, [email, name, password]);

  const handleRegister = () => {
    const userDetails = { email, name, password };
    register(userDetails, navigate);
  };
  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: "white" }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        email={email}
        name={name}
        password={password}
        setEmail={setEmail}
        setName={setName}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      />
    </AuthBox>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Register);
