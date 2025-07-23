class BoardRequestDTO {
  constructor(name) {
    this.name = name;
  }

  static fromJson(json) {
    return new BoardRequestDTO(json.name);
  }
}

export default BoardRequestDTO;
