import * as Exceptions from '../Exceptions/Exceptions';
import BoardRepository from '../Repository/boardRepository';

export default class BoardService {
  constructor() {
    this.boardRepository = new BoardRepository();
  }

  /**
   * This method is used to create a new board
   */
  async createBoard(arg) {

    const board = await this.boardRepository.addBoard(arg);

    return board;
  }
}
