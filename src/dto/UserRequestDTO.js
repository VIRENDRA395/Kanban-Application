class UserRequestDTO {
  constructor({ username, password, firstName, lastName }) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static fromJson(json) {
    return new UserRequestDTO(json);
  }
}

export default UserRequestDTO;
