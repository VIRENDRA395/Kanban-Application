import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import MoreVert from "@mui/icons-material/MoreVert";
import {
  Checkbox,
  Dropdown,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalDialog,
  Option,
  Select,
  selectClasses,
  Textarea,
} from "@mui/joy";
import { Button } from "@mui/material";
import React from "react";
import { Transition } from "react-transition-group";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { addNewBoard } from "../api/board-web-storage-api";
import { DataContext } from "../hooks/DataContext";

function BoardEditModal({ open, setOpen, board, setBoard }) {
  const { user } = React.useContext(DataContext);
  const [columns, setColumns] = React.useState([{}, {}]);
  const [boardName, setBoardName] = React.useState("");

  function saveBoard() {
    // If Board Is Null, Create New Board
    if (!board) {
      addNewBoard({ name: boardName }, user.id);
    }
    setOpen(false);
  }

  function closeModal() {
    setOpen(false);
    setColumns(board?.columns || [{}, {}]);
    setBoardName(board?.name || "");
  }

  useEffect(() => {
    if (board) {
      setColumns(board.columns || [{}, {}]);
      setBoardName(board.name || "");
    }
  }, [board]);

  return (
    <React.Fragment>
      <Transition in={open} timeout={400}>
        {(state) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={() => {
              closeModal();
            }}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 100ms, backdrop-filter 100ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: "blur(8px)" },
                    entered: { opacity: 1, backdropFilter: "blur(8px)" },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
            }}
          >
            <ModalDialog
              sx={{
                opacity: 0,
                transition: `opacity 100ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
              className="edit-task-modal edit-board-modal"
            >
              <div className="header">
                <h2>{board ? "Edit" : "Add New"} Board</h2>
              </div>

              <div className="task-input-container task-title">
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Task title goes here..."
                  value={boardName}
                  onChange={(e) => {
                    setBoardName(e.target.value);
                  }}
                />
              </div>

              <div className="task-input-container task-subtasks">
                <FormLabel>Columns</FormLabel>
                {columns.map((col, index) => {
                  return (
                    <div className="subtask-container">
                      <Input
                        key={index}
                        value={col.name}
                        onChange={(e) => {
                          const newColumns = [...columns];
                          newColumns[index].name = e.target.value;
                          setColumns(newColumns);
                        }}
                        placeholder="Subtask name goes here..."
                      />
                      <button
                        onClick={() => {
                          setColumns(columns.filter((_, i) => i !== index));
                        }}
                      >
                        <CloseIcon sx={{ color: "var(--medium-grey)" }} />
                      </button>
                    </div>
                  );
                })}
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => {
                    setColumns([...columns, {}]);
                  }}
                >
                  + Add New Column
                </Button>
              </div>

              <div className="task-input-container save-changes-div">
                <Button
                  variant="contained"
                  disableElevation
                  onClick={saveBoard}
                >
                  {board ? "Save Changes" : "Create Task"}
                </Button>
              </div>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}

export default BoardEditModal;
