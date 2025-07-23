import React, { Fragment } from "react";
import Logo from "./Logo";
import BoardIcon from "../svg/BoardIcon";
import HideEyeIcon from "../svg/HideEyeIcon";
import ThemeSwitcher from "./ThemeSwitcher";
import { DataContext } from "../hooks/DataContext";
import BoardEditModal from "./BoardEditModal";
import { Button } from "@mui/joy";

function Sidebar() {
  const { toggleSideBar, setCurrentBoard, currentBoard, user } =
    React.useContext(DataContext);
  const [isBoardeditModalOpen, setIsBoardeditModalOpen] = React.useState(false);

  function switchBoardBtn(index) {
    const boardBtns = document.querySelectorAll("#board-list .board-btn");
    boardBtns.forEach((item) => {
      item.classList.remove("active");
    });
    boardBtns[index].classList.add("active");
  }

  return (
    <>
      <div id="sidebar">
        <div className="header">
          <Logo />
        </div>
        <div id="board-list">
          <span>all boards ({user?.boards.length})</span>
          {user?.boards.map((item, index) => {
            return (
              <Fragment key={index}>
                <Button
                  className={"board-btn " + (index === 0 ? "active" : "")}
                  onClick={() => {
                    setCurrentBoard(item);
                    switchBoardBtn(index);
                  }}
                >
                  <BoardIcon />
                  <h3>{item.name}</h3>
                </Button>
              </Fragment>
            );
          })}
          <Button
            className="board-btn create-board-btn"
            onClick={() => {
              setIsBoardeditModalOpen(true);
            }}
          >
            <BoardIcon />
            <h3>+ create new board</h3>
          </Button>
        </div>
        <ThemeSwitcher />
        <button className="board-btn hide-sidebar-btn" onClick={toggleSideBar}>
          <HideEyeIcon />
          <h3>Hide Sidebar</h3>
        </button>
      </div>

      <BoardEditModal
        open={isBoardeditModalOpen}
        setOpen={setIsBoardeditModalOpen}
        setBoard={setCurrentBoard}
      />
    </>
  );
}

export default Sidebar;
