import { createSelector } from "reselect";

export const selectTrackEntities = (state) => state.tracks.entities;

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

export const selectTrackIds = createSelector(selectTrackEntities, (entities) =>
  Object.keys(entities)
);
