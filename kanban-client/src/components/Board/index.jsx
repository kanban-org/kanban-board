import React, { useCallback, useState } from "react";
import classes from "./Board.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";
import Track from "./StatusTrack/Track";
import Overlay from "../UI/Overlay";
import Modal from "../UI/Modal";
import AddNewTrack from "./StatusTrack/AddNewTrack";
import { useSelector } from "react-redux";
import { selectCurrentBoardId } from "../../state/reducers/selectors/board";
import { selectTrackIdsByBoardId } from "../../state/reducers/selectors/track";

function Board() {
  const [showAddColumn, setShowAddColumn] = useState(false);
  const currentBoardId = useSelector((state) => selectCurrentBoardId(state));

  // get all tracks of the currentBoardId
  const trackIds = useSelector((state) =>
    selectTrackIdsByBoardId(state, currentBoardId)
  );

  const handleAddColumn = useCallback(() => {
    setShowAddColumn(!showAddColumn);
  }, [setShowAddColumn, showAddColumn]);

  const addColumnFormModal = (
    <>
      <Overlay />
      <Modal onCloseModal={handleAddColumn}>
        <AddNewTrack />
      </Modal>
    </>
  );

  return (
    <>
      <ScrollContainer
        className={classes.container + " scrollbar scroll-container"}
        hideScrollbars={false}
      >
        {trackIds.map((trackId) => {
          return <Track trackId={trackId} key={trackId} />;
        })}

        <div className={classes.addColumn}>
          <button
            className={"btn " + classes.addColumnBtn}
            onClick={handleAddColumn}
          >
            + Add Column
          </button>
        </div>
      </ScrollContainer>

      {showAddColumn && addColumnFormModal}
    </>
  );
}

export default Board;
