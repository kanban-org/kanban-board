const { Board, sequelize } = require('../../models');

export default class BoardRepository {
  async addBoard(boardName) {
    const board = await Board.create({
      boardName: boardName,
    });

    if(!board) {
      throw new Error('Error in creating board');
    }

    return board;
  }
}
