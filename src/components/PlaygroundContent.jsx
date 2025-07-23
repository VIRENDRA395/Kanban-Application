import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { getTaks } from "../api/board-local-storage-api";
import { DataContext } from "../hooks/DataContext";
import Board from "./Board";
import BoardEditModal from "./BoardEditModal";

function PlaygroundContent() {
  const { currentBoard, setCurrentBoard } = React.useContext(DataContext);
  const [isBoardeditModalOpen, setIsBoardeditModalOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);

  return (
    <div id="playground-content">
      {currentBoard ? (
        currentBoard.columns?.length === 0 ? (
          <div className="empty-board">
            <p>This board is empty. Create a new column to get started.</p>
            <Button
              className="add-btn"
              onClick={() => {
                setIsBoardeditModalOpen(true);
              }}
            >
              + Add New Column
            </Button>
          </div>
        ) : (
          <Board />
        )
      ) : (
        <Button
          className="add-btn"
          onClick={() => {
            setIsBoardeditModalOpen(true);
          }}
        >
          create your first board
        </Button>
      )}
      <BoardEditModal
        open={isBoardeditModalOpen}
        setOpen={setIsBoardeditModalOpen}
        board={currentBoard}
        setBoard={setCurrentBoard}
      />
    </div>
  );
}

export default PlaygroundContent;
