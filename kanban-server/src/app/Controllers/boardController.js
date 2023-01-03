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

  /**
   * Get all boards
   * @returns {object} - The boards object
   */
  async getAllBoards(request) {
    try {
      const resBoards = await this.boardService.getAllBoards();

      if (!resBoards) {
        throw new Exceptions.NotFoundException('Boards not found');
      }

      this.sendResponse(resBoards);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Get board by id
   * @param {string} request.params.id - The `id` in request params
   * @returns {object} - The board object
   * @throws {NotFoundException} - If board not found
   */
  async getBoardById(request) {
    const { id } = request.params;
    try {
      const resBoard = await this.boardService.getBoardById(id);

      if (!resBoard) {
        throw new Exceptions.NotFoundException('Board not found');
      }

      this.sendResponse(resBoard);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Update board by id
   * @param {string} request.params.id - The `id` in request params
   * @param {string} request.body.boardName - The `boardName` in request body
   * @returns {object} - The board object
   */
  async updateBoardById(request) {
    const { id } = request.params;
    const { boardName } = request.body;
    try {
      const resBoard = await this.boardService.updateBoardById(id, boardName);

      if (!resBoard) {
        throw new Exceptions.NotFoundException('Board not updated');
      }

      this.sendResponse(resBoard);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Delete board by id
   * @param {string} request.params.id - The `id` in request params
   */
  async deleteBoard(request) {
    const { id } = request.params;
    try {
      const resBoard = await this.boardService.deleteBoard(id);

      if (!resBoard) {
        throw new Exceptions.NotFoundException('Board not deleted');
      }

      this.sendResponse(resBoard);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Get all tracks of a board
   * @param {string} request.params.boardId - The `boardId` in request params
   * @returns {object} - The tracks object
   */
  async getAllTracksOfBoard(request) {
    const { boardId } = request.params;
    try {
      const resTracks = await this.boardService.getAllTracksOfBoard(boardId);

      if (!resTracks) {
        throw new Exceptions.NotFoundException('Tracks not found');
      }

      this.sendResponse(resTracks);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Get all tasks of a track
   * @param {string} request.params.boardId - The `boardId` in request params
   */
  async getAllTasksOfBoard(request) {
    const { boardId } = request.params;
    try {
      const resTrackTasks = await this.boardService.getAllTasksOfBoard(boardId);

      if (!resTrackTasks) {
        throw new Exceptions.NotFoundException('Tasks not found');
      }

      this.sendResponse(resTrackTasks);
    } catch (error) {
      this.handleException(error);
    }
  }
}
