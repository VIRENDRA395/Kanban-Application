import React from "react";
import Todo from "./Todo";

function TodoList({ tasks, index, status }) {
  console.log(tasks);
  return (
    <div className={"todo-list _" + ((index % 3) + 1)}>
      <h4 className="todo-list-name">
        {status} ({tasks.length})
      </h4>
      {tasks.tasks?.map((task) => (
        <Todo key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TodoList;
