import Task from "./Task";

class Board {
  constructor({ id, name, taskList, statusList }) {
    this.id = id;
    this.name = name;
    this.taskList = Array.from(taskList || []).map(Task.fromJson);
    this.statusList = Array.from(statusList || []);
  }

  static fromJson(json) {
    return new Board(json);
  }
}

export default Board;
