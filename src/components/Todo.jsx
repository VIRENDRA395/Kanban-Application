import React from "react";
import TaskViewModal from "./TaskViewModal";

function Todo({ task }) {
  const [isTaskViewModalOpen, setIsTaskViewModalOpen] = React.useState(false);

  let completedSubtasks = 0;
  let totalSubtasks = 0;

  if (task.subtasks) {
    completedSubtasks = task.subtaskList.filter(
      (subtask) => subtask.isCompleted
    ).length;
    totalSubtasks = task.subtaskList.length;
  }

  console.log(task);

  return (
    <>
      <div className="todo" onClick={() => setIsTaskViewModalOpen(true)}>
        <h3>{task.title}</h3>
        {totalSubtasks !== 0 ? (
          <p>
            {completedSubtasks} of {totalSubtasks} substasks
          </p>
        ) : null}
      </div>
      <TaskViewModal
        open={isTaskViewModalOpen}
        setOpen={setIsTaskViewModalOpen}
        task={task}
      />
    </>
  );
}

export default Todo;
