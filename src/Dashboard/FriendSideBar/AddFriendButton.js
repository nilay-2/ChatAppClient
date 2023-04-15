import React, { useState } from "react";
// import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import { Button } from "@mui/material";
import AddFriendDialog from "./AddFriendDialog";
const additionalStyles = {
  marginTop: "10px",
  // marginLeft: "5px",
  marginLeft: "auto",
  marginRight: "auto",
  width: "80%",
  height: "30px",
  backgroundColor: "#3ba55d",
  color: "#fff",
};
export default function AddFriendButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlerOpenAddFriendDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddFriendDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <Button style={additionalStyles} onClick={handlerOpenAddFriendDialog}>
        Add Friend
      </Button>
      <AddFriendDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddFriendDialog}
      />
    </>
  );
}
