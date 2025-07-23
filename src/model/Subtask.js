class Subtask {
  constructor({ id, title, isCompleted }) {
    this.id = id;
    this.title = title;
    this.isCompleted = isCompleted;
  }

  static fromJson(json) {
    return new Subtask(json);
  }
}

export default Subtask;
