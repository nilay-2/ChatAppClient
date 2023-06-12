import React, { useState, useEffect } from "react";
import { validateEmail } from "../../shared/utils/validateForm";
import InputWithLabel from "../../shared/components/InputWithLabels";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Typography } from "@mui/material";
import { getActions } from "../../store/actions/friendsActions";
import { connect } from "react-redux";
import { sendInvtNotification } from "../../realtimeCommunication/socketConnection";
function AddFriendDialog({
  isDialogOpen,
  closeDialogHandler,
  sendFriendInvitation = () => {},
}) {
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const handleSentInvitation = () => {
    sendFriendInvitation({ mail: mail }, handleCloseDialog);
  };

  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail("");
  };

  useEffect(() => {
    setIsFormValid(validateEmail(mail));
  }, [mail, setIsFormValid]);

  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>
        <Typography>Invite a friend</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/*<Typography>*/}
          Enter e-mail address of friend which you would like to invite
          {/*</Typography>*/}
        </DialogContentText>
        <InputWithLabel
          label="Mail"
          type="text"
          value={mail}
          setValue={setMail}
          placeholder="Enter mail address"
        ></InputWithLabel>
      </DialogContent>
      <DialogActions>
        <CustomPrimaryButton
          onClick={handleSentInvitation}
          disabled={isFormValid}
          label="Send"
          additionalStyles={{
            marginLeft: "15px",
            marginRight: "15px",
            marginBottom: "10px",
          }}
        />
      </DialogActions>
    </Dialog>
  );
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(AddFriendDialog);
