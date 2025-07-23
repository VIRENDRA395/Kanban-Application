// This file contains the api for the board local storage
// Using the Brower's local storage to store the board data
// we are able to persist the data between sessions
const DATA = JSON.parse(window.localStorage.getItem("boards")) || [];

export const getBoards = () => {
  return DATA.boards.map((board) => {
    const { id, name } = board;
    return { id, name };
  });
};

export const getTaks = (boardId) => {
  return DATA.boards.find((board) => board.id === boardId)?.tasks || [];
};

export const getTasksAsColumns = (boardId) => {
  const columns = {};
  getTaks(boardId).forEach((task) => {
    columns[task] = [...columns[task], task];
  });
};

export const saveUser = ({ password, username }) => {
  console.log(password + username);
  window.sessionStorage.setItem("user", JSON.stringify({ password, username }));
};

export const getUser = () => {
  console.log(JSON.parse(window.sessionStorage.getItem("user")));
  return JSON.parse(window.sessionStorage.getItem("user"));
};

export const removeFromSession = () => {
  window.sessionStorage.removeItem("user");
};
