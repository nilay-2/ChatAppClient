import axios from "axios";
import {
  devBackEndUrl,
  devFrontEndUrl,
  prodBackEndUrl,
  prodFrontEndUrl,
} from "./shared/utils/url";
import { toast } from "react-toastify";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebase";
import b64toBlob from "b64-to-blob";
const apiClient = axios.create({
  baseURL: `${
    process.env.NODE_ENV === "development" ? devBackEndUrl : prodBackEndUrl
  }/api`,
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin":
      process.env.NODE_ENV === "development" ? devFrontEndUrl : prodFrontEndUrl,
  },
});

export const login = async (data) => {
  console.log(data);
  try {
    return await apiClient.post("/users/login", data, {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post("/users/signUp", data, {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

// update password

export const updatePassword = async (data) => {
  try {
    return await apiClient.patch("/users/updatePassword", data, {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/invite", data, {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const logout = async () => {
  try {
    return await apiClient.delete("/users/logout", {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const protectRoute = async () => {
  try {
    return await apiClient.get("/users/verify", {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: true,
      expection: error,
    };
  }
};

export const getFriends = async () => {
  try {
    return await apiClient.get("/friends/", {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: error,
      exception: error,
    };
  }
};

export const acceptFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/accept", data, {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const rejectFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/reject", data, {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const getChatHistory = async (participants) => {
  const { author, receiver } = participants;
  try {
    return await apiClient.post(`/chat/${receiver}`, participants, {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const createGroupChat = async ({ groupName, friendsAdded }) => {
  const arrayOfFriendsId = friendsAdded.map((frnd) => frnd.friendId._id);
  try {
    return await apiClient.post(
      "/groupChat/createGroup",
      { groupName, arrayOfFriendsId },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const getGroupChatHistory = async (groupId) => {
  try {
    return await apiClient.get(`/groupChat/${groupId}/chats`, {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const deleteMessage = async (message) => {
  try {
    return await apiClient.delete(`/chat/delete/${message.id}`, {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const deleteGroupMessage = async (data) => {
  const { groupId, messageId } = data;
  try {
    return await apiClient.delete(`/groupChat/${groupId}/delete/${messageId}`, {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    return await apiClient.patch(
      `/notification/${id}/markAsRead`,
      { data: "notify" },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    return await apiClient.patch(
      "/notification/markAllAsRead",
      { data: "notify" },
      { withCredentials: true }
    );
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

// upload profile picture

export const uploadProfilePic = (imgFile) => {
  return new Promise(async function (resolve, reject) {
    try {
      toast
        .promise(
          apiClient.post("/users/uploadProfileImg", imgFile, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
          {
            pending: "Uploading profile picture...",
            success: "Profile picture uploaded successfully!",
            error: "Failed to upload profile picture",
          }
        )
        .then((response) => {
          if (response.data?.status === "success") {
            const bufferData = response.data?.bufferData;
            const blob = b64toBlob(bufferData.b64data, bufferData.contentType);
            console.log(blob);
            const imageRef = ref(storage, `users/${bufferData.fileName}`);
            uploadBytes(imageRef, blob).then(() => {
              getDownloadURL(imageRef).then((url) => resolve(url));
            });
          } else {
            reject(response.response.data?.message);
            // console.log(response.response.data?.message);
          }
        });
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });
};

export const updatePFP = async (photoUrl) => {
  try {
    return await apiClient.patch(
      "/users/updatePFP",
      { photo: photoUrl },
      { withCredentials: true }
    );
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const updateNameAndEmail = async (data) => {
  try {
    return await apiClient.patch("/users/updateNameAndEmail", data, {
      withCredentials: true,
    });
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};
