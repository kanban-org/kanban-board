import Controller from './controller';
import * as Exceptions from '../Exceptions/Exceptions';
import BoardService from '../Services/boardService';

export default class BoardController extends Controller {
  constructor(response) {
    super(response);
    this.boardService = new BoardService();
  }

  /**
   * Create a new board
   * @param {string} request.boardName - The `boardName` in request body
   */
  async createBoard(request) {
    const { boardName } = request.body;
    try {
      const resBoard = await this.boardService.createBoard(boardName);

      if (!resBoard) {
        throw new Exceptions.NotFoundException('Board not created');
      }

      this.sendResponse(resBoard);
    } catch (error) {
      this.handleException(error);
    }
  }
}
