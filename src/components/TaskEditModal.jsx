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

function TaskEditModal({ open, setOpen, setParent, task }) {
  const [subtasks, setSubtasks] = React.useState(task?.subtasks || [{}, {}]);

  return (
    <React.Fragment>
      <Transition in={open} timeout={400}>
        {(state) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={() => {
              setOpen(false);
              setParent?.(true);
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
              className="edit-task-modal"
            >
              <div className="header">
                <h2>{task ? "Edit" : "Add"} Task</h2>
              </div>

              <div className="task-input-container task-title">
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Task title goes here..."
                  defaultValue={task?.title}
                />
              </div>

              <div className="task-input-container task-details">
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Task title goes here..."
                  defaultValue={task?.description}
                />
              </div>

              <div className="task-input-container task-subtasks">
                <FormLabel>Subtasks</FormLabel>
                {subtasks.map((subtask, index) => {
                  return (
                    <div className="subtask-container">
                      <Input
                        key={index}
                        defaultValue={subtask?.title}
                        placeholder="Subtask title goes here..."
                      />
                      <button
                        onClick={() => {
                          setSubtasks(subtasks.filter((_, i) => i !== index));
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
                    setSubtasks([...subtasks, { title: "" }]);
                  }}
                >
                  + Add New Subtask
                </Button>
              </div>

              <div className="task-input-container">
                <label>Status</label>
                <Select
                  defaultValue={task?.status}
                  placeholder="Select a status..."
                  indicator={<KeyboardArrowDown />}
                  sx={{
                    width: "100%",
                    height: "40px",
                    [`& .${selectClasses.indicator}`]: {
                      transition: "0.1s",
                      [`&.${selectClasses.expanded}`]: {
                        transform: "rotate(-180deg)",
                      },
                    },
                  }}
                >
                  <Option value="Todo">Todo</Option>
                  <Option value="Doing">Doing</Option>
                  <Option value="Done">Done</Option>
                </Select>
              </div>

              <div className="task-input-container save-changes-div">
                <Button variant="contained" disableElevation>
                  {task ? "Save Changes" : "Create Task"}
                </Button>
              </div>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}

export default TaskEditModal;
