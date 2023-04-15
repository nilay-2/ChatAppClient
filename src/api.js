import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
});

export const login = async (data) => {
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

export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/invite", data, {
      withCredentials: true,
    });
  } catch (error) {
    // logout();
    // console.log(error);
    return {
      error: true,
      exception: error,
    };
  }
};

export const logout = async () => {
  try {
    return await apiClient.get("/users/logout", {
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
