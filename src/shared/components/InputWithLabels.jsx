import React, { useState } from "react";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
});

const Label = styled("p")({
  color: "#b9bbbe",
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "16px",
});

const Input = styled("input")({
  flexGrow: 1,
  height: "40px",
  border: "1px soild black",
  color: "#dcddde",
  backgroundColor: "#35393f",
  //   backgroundColor: "black",
  fontSize: "16px",
  padding: "0 5px",
  borderRadius: "5px",
});

export default (props) => {
  const { value, setValue, label, type, placeholder } = props;

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={handleValueChange}
        type={type}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};
