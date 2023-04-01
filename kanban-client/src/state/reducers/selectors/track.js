import { createSelector } from "reselect";

const selectTrackEntities = (state) => state.tracks.entities;

// {
//   1 : {
//     id: 1,
//     name: "bhargav"
//   },
//   2: {
//     id: 2,
//     name: "gargi"
//   }
// }

export const selectTracks = createSelector(
  selectTrackEntities,
  // output selector
  (entities) => Object.values(entities)
);

export const selectTrackById = (state, trackId) => {
  return selectTrackEntities(state)[trackId];
};

export const selectTrackIdsByBoardId = (state, boardId) => {
  const tracks = selectTracks(state);
  return tracks
    .filter((track) => track.boardId === boardId)
    .map((track) => track.id);
};
