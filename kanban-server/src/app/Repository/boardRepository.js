const { Board, Track, sequelize } = require('../../models');

export default class BoardRepository {
  async addBoard(boardName) {
    const board = await Board.create({
      boardName: boardName,
    });

    if (!board) {
      throw new Error('Error in creating board');
    }

    return board;
  }

  async getAllBoards() {
    const boards = await Board.findAll();

    if (!boards) {
      throw new Error('Error in getting boards');
    }

    return boards;
  }

  async getBoardById(id) {
    const board = await Board.findOne({
      where: {
        id: id,
      },
    });

    if (!board) {
      throw new Error('Error in fetching board');
    }

    return board;
  }

  async getBoardByName(boardName) {
    const board = await Board.findOne({
      where: {
        boardName: boardName,
      },
    });

    return board;
  }

  async updateBoard(id, boardName) {
    const board = await Board.findOne({
      where: {
        id: id,
      },
    });

    if (!board) {
      throw new Error('Error in fetching board');
    }

    board.boardName = boardName;

    const updatedBoard = await board.save();

    if (!updatedBoard) {
      throw new Error('Error in updating board');
    }

    return updatedBoard;
  }

  async deleteBoard(id) {
    try {
      await sequelize.transaction(async (t) => {
        const board = await Board.findOne({
          where: {
            id: id,
          },
          transaction: t,
        });

        if (!board) {
          throw new Error('Error in fetching board');
        }

        await board.destroy({ transaction: t });
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Method to add default tracks to new board
   */
  async addDefaultTracksToBoard(boardId) {
    const defaultTracks = [
      {
        trackName: 'To Do',
        boardId,
        colorCode: '#FF0000',
      },
      {
        trackName: 'In Progress',
        boardId,
        colorCode: '#HY7F00',
      },
      {
        trackName: 'Done',
        boardId,
        colorCode: '#00FF00',
      },
    ];

    const tracks = await Track.bulkCreate(defaultTracks);

    if (!tracks) {
      throw new Error('Error in creating default tracks');
    }

    return tracks;
  }

  async getAllTracksOfBoard(boardId) {
    const tracks = await Board.findAll({
      where: {
        id: boardId,
      },
      include: [
        {
          model: Track,
          attributes: ['id', 'trackName', 'colorCode', 'createdAt'],
        },
      ],
    });

    return tracks;
  }
}
