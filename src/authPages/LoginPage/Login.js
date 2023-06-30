import AuthBox from "../../shared/components/AuthBox";
import LoginHeader from "./LoginHeader";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPageInputs from "./LoginPageInputs";
import LoginPageFooter from "./LoginPageFooter";
import { validateLoginForm } from "../../shared/utils/validateForm";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions";
const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsFormValid(validateLoginForm({ email, password }));
  }, [email, password]);
  const handleLogin = () => {
    const userDeatails = { email, password };
    login(userDeatails, navigate);
  };

  return (
    <AuthBox>
      <LoginHeader />
      <LoginPageInputs
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
      <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Login);
