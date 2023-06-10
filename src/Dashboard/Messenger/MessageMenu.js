import React, { useState } from "react";
import { getActions } from "../../store/actions/chatActions";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import ReplyIcon from "@mui/icons-material/Reply";
import "../../css/messageMenu.css";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import store from "../../store/store";
const MessageMenu = ({
  userId,
  messageDetails,
  setreplyToMessage,
  setDeleteMessage,
  deleteMessage,
  sendDeleteRequest,
  messageToDelete,
  chatType,
  chosenChatDetails,
  sendGroupMsgDeleteRequest,
}) => {
  const [menu, setMenu] = useState(false);

  const [openDeleteMsgDialog, setOpenDeleteMsgDialog] = useState(false);

  const handleToggleMenu = () => {
    setMenu(!menu);
  };

  const replyHandler = () => {
    const replyToMessageDetails = { ...messageDetails };
    if (replyToMessageDetails.file)
      replyToMessageDetails.content = "Click to see attachment";
    setreplyToMessage(replyToMessageDetails);
  };

  const handleClose = () => {
    setDeleteMessage(null);
    setOpenDeleteMsgDialog(false);
  };

  const handleOpen = () => {
    setDeleteMessage(messageDetails);
    setOpenDeleteMsgDialog(true);
  };

  const deleteMessageHandler = () => {
    setOpenDeleteMsgDialog(false);
    if (chatType === "DIRECT") {
      sendDeleteRequest(messageToDelete);
    } else if (chatType === "GROUP") {
      const groupId = chosenChatDetails?._id;
      const messageId = messageToDelete?.id;
      const data = { groupId, messageId };
      sendGroupMsgDeleteRequest(data);
    }
  };

  return (
    <div className="menu-container">
      {menu ? (
        <div className="menu">
          <ul>
            {userId?.toString() ===
            store.getState().auth.userDetails._id?.toString() ? (
              <li onClick={handleOpen}>
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Delete Message
                </span>{" "}
                <DeleteIcon sx={{ color: "white" }} />
              </li>
            ) : (
              ""
            )}
            <li>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                Pin Message
              </span>{" "}
              <PushPinIcon sx={{ color: "white" }} />
            </li>
            <li onClick={replyHandler}>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                Reply
              </span>{" "}
              <ReplyIcon sx={{ color: "white" }} />
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}

      <button
        style={{
          display: "block",
          borderRadius: "10px",
          padding: "3px",
          backgroundColor: "#313439",
          border: "0.2px solid black",
        }}
        onClick={handleToggleMenu}
      >
        <i className="bi bi-three-dots" style={{ color: "#fff" }}></i>
      </button>
      <Dialog
        open={openDeleteMsgDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"DELETE MESSAGE"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this message?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={deleteMessageHandler} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(MessageMenu);
