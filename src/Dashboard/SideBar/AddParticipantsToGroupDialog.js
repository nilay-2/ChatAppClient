import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import Avatar from "../../shared/components/Avatar";
import "../../css/FriendListItem.css";
import axios from "axios";
const ContentWrapper = styled("div")({
  width: "420px",
  height: "auto",
});

const InputTemplate = styled("input")({
  width: "100%",
  backgroundColor: "#121216",
  color: "white",
  borderRadius: "5px",
  padding: "5px 10px",
  marginBottom: "10px",
  marginTop: "4px",
});

const FriendsList = styled("div")({
  marginTop: "10px",
  width: "100%",
  backgroundColor: "#24272e",
  height: "200px",
  overflow: "auto",
  boxShadow: "inset 0 7px 9px -7px rgba(0,0,0,0.4)",
});

const FriendListItem = styled("div")({
  width: "100%",
  height: "auto",
  padding: "4px 0",
  margin: "5px 0",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
});

const AddedFriendsList = styled("div")({
  width: "100%",
  height: "auto",
  padding: "4px",
  display: "flex",
  flexWrap: "wrap",
});

const AddedFriendsListItem = styled("div")({
  width: "auto",
  height: "25px",
  padding: "3px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#333333",
  margin: "3px",
});

const AddParticipantsToGroupDialog = ({
  isDialogOpen,
  closeDialogBoxHandler,
}) => {
  const [friends, setFriends] = useState([]);
  const [friendsAdded, setFriendsAdded] = useState([]);
  const [searchByQuery, setSearchByQuery] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [query, setQuery] = useState("");
  // initial fetch to get the friends of the current users
  useEffect(() => {
    const getFriends = async () => {
      const friendsResponse = await axios.get(
        "http://localhost:5000/api/friends/",
        {
          withCredentials: true,
        }
      );
      setFriends((prev) => [...prev, ...friendsResponse.data.friends]);
    };
    getFriends();
  }, []);
  // search friends by their name to add in group chat
  useEffect(() => {
    if (query.length > 0) {
      const nameRegex = new RegExp(`${query}`);
      const filterByName = friends.filter((val) => {
        if (val.friendId.name.match(nameRegex)) return val;
      });
      setSearchByQuery(filterByName);
    }
  }, [query]);

  // function to add friend
  const addFriendHandler = (friend) => {
    const frnd = friendsAdded.find((val) => val._id === friend._id);
    if (!frnd) {
      setFriendsAdded((prev) => [...prev, friend]);
    }
  };

  // function to remove friend
  const removeFriend = (friend) => {
    const newArr = friendsAdded.filter((val) => {
      let newVal = null;
      if (val._id !== friend._id) {
        newVal = val;
      }
      return newVal;
    });
    setFriendsAdded(newArr);
  };

  // set the input query to the query variable
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const setGroupNameHandler = (e) => {
    setGroupName(e.target.value);
  };
  // if query length is 0 then return all friends else return the array of friends that is filtered by names
  const frndsArr = (query) => {
    if (query.length === 0) return friends;
    else return searchByQuery;
  };
  return (
    <Dialog open={isDialogOpen} onClose={closeDialogBoxHandler}>
      <DialogTitle sx={{ backgroundColor: "#24272e" }}>
        <Typography sx={{ color: "white" }}>
          Add Friends to the server
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#24272e" }}>
        <ContentWrapper>
          <InputTemplate
            type="text"
            placeholder="Group name"
            value={groupName}
            onChange={setGroupNameHandler}
          />
          <InputTemplate
            type="text"
            placeholder="Search for friends"
            value={query}
            onChange={queryChangeHandler}
          />
          <AddedFriendsList>
            {friendsAdded.map((val, i) => {
              return (
                <AddedFriendsListItem key={i}>
                  <Typography sx={{ color: "white", marginRight: "5px" }}>
                    {val.friendId.name}
                  </Typography>
                  <div
                    className="remove-participant"
                    onClick={() => {
                      removeFriend(val);
                    }}
                  >
                    <i className="bi bi-x"></i>
                  </div>
                </AddedFriendsListItem>
              );
            })}
          </AddedFriendsList>
          <FriendsList>
            {frndsArr(query).map((val, i) => {
              return (
                <div className="FriendListItemContainer" key={i}>
                  <FriendListItem className="FriendListItem">
                    <Avatar username={val.friendId?.name}></Avatar>
                    <Typography sx={{ color: "white", marginLeft: "10px" }}>
                      {val.friendId?.name}
                    </Typography>
                  </FriendListItem>
                  <Button
                    onClick={() => {
                      addFriendHandler(val);
                    }}
                    className="add--btn"
                    sx={{
                      border: "1px solid green",
                      marginRight: "5px",
                      height: "35px",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ color: "white" }}>
                      Add
                    </Typography>
                  </Button>
                </div>
              );
            })}
          </FriendsList>
        </ContentWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default AddParticipantsToGroupDialog;
