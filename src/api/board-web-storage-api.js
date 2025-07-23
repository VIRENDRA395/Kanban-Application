import axios from "axios";

const UserApi = axios.create({
  baseURL: "http://localhost:8085/kanban/users",
});

const BoardApi = axios.create({
  baseURL: "http://localhost:8085/kanban/boards",
});

const TaskApi = axios.create({
  baseURL: "http://localhost:8085/kanban/tasks",
});

export const saveUser = async (userRequest) => {
  const response = await UserApi.post("/user", userRequest);
  return response.data;
};

export const authenticate = async (username, password) => {
  console.log("Authenticating...");
  console.log(username, password);
  const response = await UserApi.post("/user/authenticate", {
    username,
    password,
  });
  return response.data;
};

export const getBoards = async () => {
  const response = await BoardApi.get("/");
  return response.data;
};

export const addNewBoard = async ({ boardRequest }, userId) => {
  console.log(boardRequest);
  const response = await UserApi.post(`/user/${userId}/boards/board`, {
    name,
  });
  return response.data;
};
