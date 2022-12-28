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
    const getDuplicateBoard = await this.boardRepository.getBoardByName(arg);

    if (getDuplicateBoard) {
      throw new Exceptions.ForbiddenException('Board Name cannot be same');
    }

    const board = await this.boardRepository.addBoard(arg);

    return board;
  }

  /**
   * This method is used to get all boards
   */
  async getAllBoards() {
    const boards = await this.boardRepository.getAllBoards();

    return boards;
  }

  /**
   * This method is used to get board by id
   */
  async getBoardById(id) {
    const board = await this.boardRepository.getBoardById(id);

    return board;
  }

  /**
   * This method is used to update board by id
   */
  async updateBoardById(id, boardName) {
    const board = await this.boardRepository.updateBoard(id, boardName);

    return board;
  }

  /**
   * This method is used to delete board by id
   */
  async deleteBoard(id) {
    const board = await this.boardRepository.getBoardById(id);

    if (!board) {
      throw new Exceptions.NotFoundException('Board not found');
    }

    await this.boardRepository.deleteBoard(id);

    return {
      success: true,
      message: 'Board deleted successfully',
    };
  }
}
