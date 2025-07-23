import { Button } from "@mui/material";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../hooks/DataContext";
import BoardEditModal from "./BoardEditModal";
import Todo from "./Todo";
import TodoList from "./TodoList";

function Board() {
  const { currentBoard, isSideBarOpen, setCurrentBoard } =
    useContext(DataContext);
  const [isBoardeditModalOpen, setIsBoardeditModalOpen] = useState(false);

  useEffect(() => {
    console.log(currentBoard);
  }, [currentBoard]);

  return (
    <>
      <div id="board" className={isSideBarOpen ? "" : "side-bar-closed"}>
        {currentBoard.statusList?.map((status, index) => {
          return (
            <TodoList
              key={index}
              status={status}
              tasks={currentBoard.taskList.filter(
                (task) => task.status === status
              )}
              index={index}
            />
          );
        })}
        <Button
          id="add-new-column"
          onClick={() => {
            setIsBoardeditModalOpen(true);
          }}
        >
          + New Column
        </Button>
      </div>

      <BoardEditModal
        open={isBoardeditModalOpen}
        setOpen={setIsBoardeditModalOpen}
        board={currentBoard}
        setBoard={setCurrentBoard}
      />
    </>
  );
}

export default Board;
