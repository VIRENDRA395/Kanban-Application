import Subtask from "./Subtask";

class Task {
  constructor({ id, title, description, status, subtaskList }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.subtaskList = Array.from(subtaskList || []).map(Subtask.fromJson);
  }

  static fromJson(json) {
    return new Task(json);
  }
}

export default Task;
