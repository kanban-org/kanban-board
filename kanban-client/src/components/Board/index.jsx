import { useCallback, useState } from "react";
import classes from "./Board.module.scss";
import { DragDropContext } from "react-beautiful-dnd";
import Track from "./Track";
import Overlay from "../UI/Overlay";
import Modal from "../UI/Modal";
import { useSelector } from "react-redux";
import { selectTrackIds } from "../../state/reducers/selectors/track";
import { selectBoardCount } from "../../state/reducers/selectors/board";
import withModalForm from "../HOC/withModalForm";
import ModalForm from "../ModalForm";
import { useActions } from "../../hooks/useActions";
import EmptyBoard from "./EmptyBoard";

function Board() {
  const [addTrackModal, setAddTrackModal] = useState(false);
  const { addNewTrackRequest, moveTaskRequest } = useActions();
  // get all tracks of the currentBoardId
  const trackIds = useSelector(selectTrackIds);
  const boardCount = useSelector(selectBoardCount);
  const boardModal = useSelector((state) => state.boards.createBoardModal);

  const handleAddTrackModal = useCallback(() => {
    setAddTrackModal(!addTrackModal);
  }, [setAddTrackModal, addTrackModal]);

  const onDragEnd = useCallback((result) => {
    const { source, destination, draggableId } = result;
    if (!destination || !source) return;
    // moveTask({ source, destination, draggableId });
    moveTaskRequest({ source, destination, draggableId });
    /* 
      we want the array from the order object, corresponding to the source.droppableId
      and remove the draggableId from that array
      also we want to add the draggableId to the destination.droppableId array

      we can do this by creating an action creator that takes in the source and destination params
      action creator: moveTask (type: MOVE_TASK, payload: { source, destination })
    */
  }, []);

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
          showColorPicker
          submitAction={addNewTrackRequest}
        />
      </Modal>
    </>
  );

  if (boardCount === 0 && !boardModal) return <EmptyBoard />;
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

          {boardCount !== 0 && (
            <div className={classes.addColumn}>
              <button
                className={"btn " + classes.addColumnBtn}
                onClick={handleAddTrackModal}
              >
                + Add Track
              </button>
            </div>
          )}
        </div>
      </DragDropContext>

      {addTrackModal && addTrackFormModal}
    </>
  );
}

export default Board;
