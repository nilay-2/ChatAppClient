import React, { useState } from "react";
import { Button } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import AddParticipantsToGroupDialog from "./AddParticipantsToGroupDialog";
export default function MainPageButton() {
  const [openDialogBox, setOpenDialogBox] = useState(false);

  const openDialogBoxHandler = () => {
    setOpenDialogBox(true);
  };

  const closeDialogBoxHandler = () => {
    setOpenDialogBox(false);
  };
  return (
    <React.Fragment>
      <Button
        onClick={openDialogBoxHandler}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "16px",
          margin: "0",
          padding: "0",
          minWidth: "0",
          marginTop: "10px",
          color: "#fff",
          backgroundColor: "#5865f2",
        }}
      >
        <GroupsIcon />
      </Button>
      <AddParticipantsToGroupDialog
        isDialogOpen={openDialogBox}
        closeDialogBoxHandler={closeDialogBoxHandler}
      />
    </React.Fragment>
  );
}
