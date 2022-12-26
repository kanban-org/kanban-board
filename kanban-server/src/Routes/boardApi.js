import express from 'express';
import BoardController from '../app/Controllers/boardController';
const BoardApiRouter = express.Router();

// Create Board
BoardApiRouter.post('/board/create', (req, res) => {
  const boardController = new BoardController(res);
  boardController.createBoard(req);
});

export default BoardApiRouter;
