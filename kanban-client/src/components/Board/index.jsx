import React, { useCallback, useState } from "react";
import classes from "./Board.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";
import Track from "./StatusTrack/Track";
import Overlay from "../UI/Overlay";
import Modal from "../UI/Modal";
import ColorPicker from "../UI/ColorPicker";
// import AddNewTrack from "./StatusTrack/AddNewTrack";
import { useSelector } from "react-redux";
import { selectCurrentBoardId } from "../../state/reducers/selectors/board";
import { selectTrackIdsByBoardId } from "../../state/reducers/selectors/track";
import withBoardForm from "../HOC/withBoardForm";
import BoardForm from "../BoardForm";
import { useActions } from "../../hooks/useActions";

function Board() {
  const [addTrackModal, setAddTrackModal] = useState(false);
  const currentBoardId = useSelector((state) => selectCurrentBoardId(state));
  const { addNewTrackRequest } = useActions();
  // get all tracks of the currentBoardId
  const trackIds = useSelector((state) =>
    selectTrackIdsByBoardId(state, currentBoardId)
  );

  const handleAddTrackModal = () => {
    setAddTrackModal(!addTrackModal);
  };

  const AddNewTrack = withBoardForm(BoardForm);

  const addColumnFormModal = (
    <>
      <Overlay />
      <Modal
        styles={{ height: "max-content" }}
        onCloseModal={handleAddTrackModal}
      >
        <AddNewTrack
          handleModal={handleAddTrackModal}
          initialValues={{
            heading: "Add New Track",
            buttonTitle: "Create new track",
          }}
          showColorPicker={true}
          submitAction={addNewTrackRequest}
        />
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
            onClick={handleAddTrackModal}
          >
            + Add Column
          </button>
        </div>
      </ScrollContainer>

      {addTrackModal && addColumnFormModal}
    </>
  );
}

export default Board;
