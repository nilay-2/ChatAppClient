import React, { Fragment, useEffect } from "react";
import Loading from "../../shared/components/Loading";
import { styled } from "@mui/system";
import store from "../../store/store";
const LoaderContainer = styled("div")({
  display: "flex",
  color: "white",
  fontWeight: "600",
});

const TypingIndicator = ({ typerName }) => {
  return (
    <Fragment>
      <LoaderContainer>
        <Loading />
        <span>{typerName} is typing...</span>
      </LoaderContainer>
    </Fragment>
  );
};

export default TypingIndicator;
