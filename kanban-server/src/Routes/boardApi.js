import express from 'express';
import BoardController from '../app/Controllers/boardController';
const BoardApiRouter = express.Router();

// Create Board
BoardApiRouter.post('/board/create', (req, res) => {
  const boardController = new BoardController(res);
  boardController.createBoard(req);
});

// Get all Boards
BoardApiRouter.get('/board/getAll', (req, res) => {
  const boardController = new BoardController(res);
  boardController.getAllBoards(req);
});

// Get Board by Id
BoardApiRouter.get('/board/:id', (req, res) => {
  const boardController = new BoardController(res);
  boardController.getBoardById(req);
});

// Update Board
BoardApiRouter.patch('/board/update/:id', (req, res) => {
  const boardController = new BoardController(res);
  boardController.updateBoardById(req);
});

// Delete Board
BoardApiRouter.delete('/board/delete/:id', (req, res) => {
  const boardController = new BoardController(res);
  boardController.deleteBoard(req);
});

// Get all Tracks of a board
BoardApiRouter.get('/board/getAllTracks/:boardId', (req, res) => {
  const boardController = new BoardController(res);
  boardController.getAllTracksOfBoard(req);
});

export default BoardApiRouter;
