import React from "react";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import UploadAvatar from "./UploadAvatar";
import { connect } from "react-redux";
const Wrapper = styled("div")({
  width: "100%",
  backgroundColor: "#202225",
  marginTop: "5px",
  height: "auto",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "15px",
});

const ButtonGroup = styled("div")({
  width: "auto",
});

const ProfilePic = ({ userDetails }) => {
  return (
    <Wrapper>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/*upload avatar */}
        <UploadAvatar />
        <Typography
          variant="h6"
          color="white"
          sx={{ marginLeft: "20px" }}
          fontWeight="bold"
        >
          {userDetails?.name}
        </Typography>
      </div>
      <ButtonGroup>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          size="small"
        >
          Delete
        </Button>
      </ButtonGroup>
    </Wrapper>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

export default connect(mapStateToProps)(ProfilePic);
