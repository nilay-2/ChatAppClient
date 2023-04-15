import React from "react";
import InputWithLabels from "../../shared/components/InputWithLabels";

export default (props) => {
  const { email, setEmail, password, setPassword } = props;
  return (
    <>
      <InputWithLabels
        value={email}
        setValue={setEmail}
        label="E-mail"
        type="text"
        placeholder="Enter e-mail address"
      />
      <InputWithLabels
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter password"
      />
    </>
  );
};
