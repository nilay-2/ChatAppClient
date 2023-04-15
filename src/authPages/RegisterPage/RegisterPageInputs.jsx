import React from "react";
import InputWithLabels from "../../shared/components/InputWithLabels";
export default function RegisterPageInputs(props) {
  const { email, name, password, setEmail, setName, setPassword } = props;
  return (
    <div>
      <InputWithLabels
        value={email}
        label="Email address"
        type="text"
        setValue={setEmail}
        placeholder="Enter email address"
      ></InputWithLabels>
      <InputWithLabels
        value={name}
        label="Username"
        type="text"
        setValue={setName}
        placeholder="Enter username"
      ></InputWithLabels>
      <InputWithLabels
        value={password}
        label="Password"
        type="password"
        setValue={setPassword}
        placeholder="Enter password"
      ></InputWithLabels>
    </div>
  );
}
