import { Drawer } from "@mui/joy";
import { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Motivational from "./assets/Motivational";
import Playground from "./components/Playground";
import EyeIcon from "./svg/EyeIcon";
import { DataContext } from "./hooks/DataContext";
import {
  getBoards,
  getUser,
  removeFromSession,
} from "./api/board-local-storage-api";
import { authenticate } from "./api/board-web-storage-api";
import User from "./model/User";
import LoginModal from "./components/LoginModal";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./components/SignUp";

document.title =
  "Kanban : " +
  Motivational[Math.floor(Math.random() * Motivational.length)].phrase;

function App() {
  function toggleSideBar() {
    setOpen(!isSideBarOpen);
  }

  const [isSideBarOpen, setOpen] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef(null);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [useLocalStorage, setUseLocalStorage] = useState(false);
  const navigate = useNavigate();

  const values = {
    isLoading,
    isSideBarOpen,
    toggleSideBar,
    currentBoard,
    setIsAuthenticated,
    setCurrentBoard,
    setIsLoading,
    user,
    setUser,
    isAuthenticated,
  };

  useEffect(() => {
    const localUser = getUser();
    if (localUser != null && !isAuthenticated) {
      console.log(localUser);
      // Fetch the user from the web
      authenticate(localUser.username, localUser.password)
        .then((u) => {
          if (u) {
            setUser(User.fromJson(u));
            setIsAuthenticated(true);
            // Navigate to home
            navigate("/");
          }
        })
        .catch((e) => {
          setIsAuthenticated(false);
          removeFromSession();
          console.error(e);
        })
        .finally(() => {
          console.log(isAuthenticated);
          setIsLoading(false);
        });
    } else {
      console.log("No user found locally");
      if (isAuthenticated || useLocalStorage) navigate("/");
      else if (window.location.pathname === "/") navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) setCurrentBoard(user?.boards[0] || []);
    console.log(user);
  }, [isAuthenticated]);

  if (error) return <div id="loading-container">ERROR</div>;
  if (isLoading) return <div id="loading-container">LOADING...</div>;

  return (
    <DataContext.Provider value={values}>
      <Routes>
        <Route
          exact
          path=""
          element={
            <div className="app">
              {isSideBarOpen && <Sidebar />}
              <Playground isSideBarOpen={isSideBarOpen} />

              {!isSideBarOpen && (
                <div className="show-side-bar-btn" onClick={toggleSideBar}>
                  <EyeIcon />
                </div>
              )}
            </div>
          }
        />
        <Route path="login" element={<LoginModal />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </DataContext.Provider>
  );
}

export default App;
