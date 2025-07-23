import Board from "./Board";

class User {
  constructor({ firstName, lastName, username, password, id, boards }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.id = id;
    this.boards = Array.from(boards || []).map(Board.fromJson);
  }

  static fromJson(json) {
    return new User(json);
  }
}

export default User;
