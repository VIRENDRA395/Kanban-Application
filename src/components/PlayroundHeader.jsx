import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import React, { useContext } from "react";
import Logo from "./Logo";
import { DataContext } from "../hooks/DataContext";
import DeleteForever from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import TaskEditModal from "./TaskEditModal";
import { Button } from "@mui/material";
import BoardEditModal from "./BoardEditModal";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider } from "@mui/joy";
import { removeFromSession } from "../api/board-local-storage-api";
import { useNavigate } from "react-router-dom";

function PlayroundHeader({ isSideBarOpen }) {
  const { currentBoard, setCurrentBoard } = useContext(DataContext);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = React.useState(false);
  const [isBoardeditModalOpen, setIsBoardeditModalOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div id="playground-header">
      <div className="board-title-container">
        {!isSideBarOpen && (
          <div className="header-logo">
            <Logo />
          </div>
        )}
        <h1>{currentBoard?.name}</h1>
      </div>
      <div className="menu">
        <Button
          disabled={!currentBoard}
          className="add-btn"
          onClick={() => {
            setIsAddTaskModalOpen(true);
          }}
        >
          + Add New Task
        </Button>
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { color: "transparent" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem
              sx={{ display: "flex", justifyContent: "space-between" }}
              onClick={() => {
                console.log(currentBoard);
                setIsBoardeditModalOpen(true);
              }}
            >
              Edit Board <ModeEditOutlineIcon />
            </MenuItem>
            <MenuItem sx={{ color: "var(--red)" }}>
              Delete Board
              <DeleteForever />
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                removeFromSession();
                navigate("/login");
              }}
              sx={{
                color: "var(--main-purple)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Logout
              <LogoutIcon />
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <TaskEditModal
        open={isAddTaskModalOpen}
        setOpen={setIsAddTaskModalOpen}
      />

      <BoardEditModal
        open={isBoardeditModalOpen}
        setOpen={setIsBoardeditModalOpen}
        board={currentBoard}
        setBoard={setCurrentBoard}
      />
    </div>
  );
}

export default PlayroundHeader;
