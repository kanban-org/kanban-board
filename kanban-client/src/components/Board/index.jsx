import { memo, useCallback, useState } from "react";
import classes from "./Board.module.scss";
import { DragDropContext } from "react-beautiful-dnd";
import Track from "./StatusTrack/Track";
import Overlay from "../UI/Overlay";
import Modal from "../UI/Modal";
import { useSelector } from "react-redux";
import { selectTrackIds } from "../../state/reducers/selectors/track";
import { selectBoardCount } from "../../state/reducers/selectors/board";
import withModalForm from "../HOC/withModalForm";
import ModalForm from "../ModalForm";
import { useActions } from "../../hooks/useActions";
import NoDataSvg from "./NoDataSvg";

function Board() {
  const [addTrackModal, setAddTrackModal] = useState(false);
  const { addNewTrackRequest, moveTask } = useActions();
  // get all tracks of the currentBoardId
  const trackIds = useSelector(selectTrackIds);
  const boardCount = useSelector(selectBoardCount);
  const handleAddTrackModal = useCallback(() => {
    setAddTrackModal(!addTrackModal);
  }, [setAddTrackModal, addTrackModal]);

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination, draggableId } = result;
      if (!destination || !source) return;
      moveTask({ source, destination, draggableId });
      /* 
      we want the array from the order object, corresponding to the source.droppableId
      and remove the draggableId from that array
      also we want to add the draggableId to the destination.droppableId array

      we can do this by creating an action creator that takes in the source and destination params
      action creator: moveTask (type: MOVE_TASK, payload: { source, destination })
    */
    },
    [moveTask]
  );

  const AddNewTrack = withModalForm(ModalForm);

  const addTrackFormModal = (
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
            label: "Track Name",
          }}
          showColorPicker={true}
          submitAction={addNewTrackRequest}
        />
      </Modal>
    </>
  );

  const noBoardsMessage = (
    <div className={classes.noBoardsContainer}>
      <NoDataSvg />
      <div className={classes.noBoards}>
        <h3 className="heading--1">No boards found!</h3>
        <h5 className="heading--5">
          Create a board to start adding tracks and tasks to it.
        </h5>
      </div>
    </div>
  ); 

  if (boardCount === 0) return noBoardsMessage;
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className={
            classes.container + " no-back-gesture scrollbar scroll-container"
          }
        >
          {trackIds.map((trackId) => {
            return <Track trackId={trackId} key={trackId} />;
          })}

          <div className={classes.addColumn}>
            <button
              className={"btn " + classes.addColumnBtn}
              onClick={handleAddTrackModal}
            >
              + Add Track
            </button>
          </div>
        </div>
      </DragDropContext>

      {addTrackModal && addTrackFormModal}
    </>
  );
}

export default Board;
