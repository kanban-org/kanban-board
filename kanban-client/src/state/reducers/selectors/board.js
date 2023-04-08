import { createSelector } from "reselect";

const selectBoardEntities = (state) => state.boards.entities;

export const selectBoards = createSelector(
  // input selector
  selectBoardEntities,
  // output selector
  (entities) => Object.values(entities)
);

export const selectBoardById = (state, boardId) => {
  return selectBoardEntities(state)[boardId];
};

export const selectCurrentBoardId = (state) => {
  return state.boards.currentBoardId;
};

export const selectBoardCount = createSelector(
  selectBoards,
  // output selector
  (boards) => boards.length
);
