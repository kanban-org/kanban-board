import { useState } from "react";
import classes from "./Board.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";
import Track from "./StatusTrack/Track";
import Overlay from "../UI/Overlay";
import Modal from "../UI/Modal";
import { useSelector } from "react-redux";
import { selectTrackIds } from "../../state/reducers/selectors/track";
import withModalForm from "../HOC/withModalForm";
import ModalForm from "../ModalForm";
import { useActions } from "../../hooks/useActions";

function Board() {
  const [addTrackModal, setAddTrackModal] = useState(false);
  const { addNewTrackRequest } = useActions();
  // get all tracks of the currentBoardId
  const trackIds = useSelector(selectTrackIds);

  const handleAddTrackModal = () => {
    setAddTrackModal(!addTrackModal);
  };

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

  return (
    <>
      <div
        className={classes.container + " no-back-gesture"}
        style={{ touchAction: "pan-y" }}
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
      {/* <ScrollContainer
        className={classes.container + " scrollbar scroll-container"}
        hideScrollbars={false}
      >
      </ScrollContainer> */}

      {addTrackModal && addTrackFormModal}
    </>
  );
}

export default Board;
