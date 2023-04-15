import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/alertActions";
function AlertNotification({
  showAlertMessage,
  closeAlertMessage,
  alertMessageContent,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={showAlertMessage}
      onClose={closeAlertMessage}
      autoHideDuration={6000}
    >
      <Alert severity="info">{alertMessageContent}</Alert>
    </Snackbar>
  );
}

const mapStateToProps = ({ alert }) => {
  // console.log(alert);
  return {
    ...alert,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AlertNotification);
