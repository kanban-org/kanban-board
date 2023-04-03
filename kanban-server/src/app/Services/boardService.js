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

    /*
      on creating a new board, we will be creating 3 columns by default
      1. To Do
      2. In Progress
      3. Done
    */
    const defaultTracks = await this.boardRepository.addDefaultTracksToBoard(board.id);

    try {
      await board.addTracks(defaultTracks);
    } catch (err) {
      throw new Exceptions.InternalServerErrorException('Error in adding default tracks to board');
    }

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

  /**
   * This method is used to get all tracks of a board
   */
  async getAllTracksOfBoard(id) {
    try {
      const tracks = await this.boardRepository.getAllTracksOfBoard(id);

      if (!tracks) {
        throw new Exceptions.NotFoundException('Tracks not found');
      }

      const newData = tracks[0].Tracks.map((track) =>
        Object.assign(
          {},
          {
            id: track.id,
            trackName: track.trackName,
            colorCode: track.colorCode,
            createdAt: track.createdAt,
          }
        )
      );

      return newData;
    } catch (error) {
      throw new Error(error);
    }
  }
  /**
   * Method to get all tasks of all tracks
   */
  async getAllTasksOfBoard(boardId) {
    try {
      const allRes = await this.boardRepository.getAllTasksOfBoard(boardId);

      if (!allRes) {
        throw new Exceptions.NotFoundException(
          'Something went wrong in getting all tasks/tracks from board'
        );
      }

      return allRes;
    } catch (error) {
      throw new Error(error);
    }
  }
}
