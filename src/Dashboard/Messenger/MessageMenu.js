import React, { useState } from "react";
// import { IconButton } from "@mui/material";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import "../../css/messageMenu.css";
const MessageMenu = () => {
  const [menu, setMenu] = useState(false);
  const handleToggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="menu-container">
      {menu ? (
        <div className="menu">
          <ul>
            <li>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                Delete Message
              </span>{" "}
              <DeleteIcon sx={{ color: "white" }} />
            </li>
            <li>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                Pin Message
              </span>{" "}
              <PushPinIcon sx={{ color: "white" }} />
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
          backgroundColor: "#313439",
          border: "0.2px solid black",
        }}
        onClick={handleToggleMenu}
      >
        {/*<MoreHorizIcon sx={{ color: "#fff" }} />*/}
        <i className="bi bi-three-dots" style={{ color: "#fff" }}></i>
      </button>
    </div>
  );
};

export default MessageMenu;
