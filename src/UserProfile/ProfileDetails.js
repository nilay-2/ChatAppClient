import React, { useState } from "react";
import { styled } from "@mui/system";
import "../css/userProfileForm.css";
import { Button } from "@mui/material";
import store from "../store/store";
import {
  updateCredentials,
  updateNameAndEmailReduxStore,
} from "../store/actions/authActions";
import { toast } from "react-toastify";
import { connect } from "react-redux";
const Wrapper = styled("div")({
  padding: "15px",
  backgroundColor: "#202225",
});

const DetailsContainer = styled("div")({
  borderRadius: "7px",
  backgroundColor: "#282b30",
  padding: "15px",
});

const ProfileDetails = ({ userDetails }) => {
  const [details, setDetails] = useState({
    name: userDetails?.name,
    email: userDetails?.email,
  });

  const [disable, setDisable] = useState(false);

  const setUsername = (e) => {
    setDetails((prev) => ({ ...prev, name: e.target.value }));
  };

  const setEmail = (e) => {
    setDetails((prev) => ({ ...prev, email: e.target.value }));
  };

  const updateCredentialsHandler = async () => {
    if (
      (details?.name === userDetails?.name &&
        details?.email === userDetails?.email) ||
      !details?.name ||
      !details?.email
    ) {
      toast.error("No update detected");
      return;
    }
    setDisable(true);
    const response = await store.dispatch(updateCredentials(details));
    if (response.data?.status === "success") {
      store.dispatch(updateNameAndEmailReduxStore(details));
      toast.success("Update credentials successfully");
      setDisable(false);
    }
    console.log(response);
  };

  return (
    <Wrapper>
      <DetailsContainer>
        <div>
          <form autoComplete="off">
            <div className="input-field">
              <label className="input-field-label">Name</label>
              <input
                type="text"
                defaultValue={details?.name}
                id="name"
                className="auth-update-input"
                onChange={setUsername}
              />
            </div>
            <div className="input-field">
              <label className="input-field-label">Email</label>
              <input
                type="text"
                defaultValue={details?.email}
                id="email"
                className="auth-update-input"
                onChange={setEmail}
              />
            </div>
            <div className="btn-field">
              <Button
                variant="contained"
                color="success"
                disabled={disable}
                onClick={updateCredentialsHandler}
              >
                SAVE SETTINGS
              </Button>
            </div>
          </form>
        </div>
      </DetailsContainer>
    </Wrapper>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

export default connect(mapStateToProps)(ProfileDetails);
