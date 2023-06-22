let socket = null;

export const setSocket = (socketInstance) => {
  socket = socketInstance;
};

export const getSocketInstance = () => {
  return socket;
};
