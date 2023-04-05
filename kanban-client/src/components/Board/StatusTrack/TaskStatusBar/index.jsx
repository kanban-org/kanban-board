import { useState } from "react";
import DotMenu from "../../../DotMenu";
import Overlay from "../../../UI/Overlay";
import icons from "../../../../img/symbol-defs.svg";

import classes from "./TaskStatusBar.module.scss";
import { useActions } from "../../../../hooks/useActions";
import Modal from "../../../UI/Modal";
import withModalForm from "../../../HOC/withModalForm";
import ModalForm from "../../../ModalForm";

function TaskStatusBar({
  colorCode,
  trackId,
  statusName,
  taskCount,
  addShadowBottom,
}) {
  const [editTrack, setEditTrack] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { deleteTrackRequest, editTrackRequest } = useActions();
  const EditTrackForm = withModalForm(ModalForm);

  const handleMenuChange = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditTrackModal = () => {
    setEditTrack(!editTrack);
  };

  const onDeleteTrack = () => {
    deleteTrackRequest(trackId);
    handleMenuChange();
  };

  const editTrackModal = (
    <>
      <Overlay />
      <Modal
        styles={{ height: "max-content" }}
        onCloseModal={handleEditTrackModal}
      >
        <EditTrackForm
          handleModal={handleEditTrackModal}
          initialValues={{
            heading: "Edit track",
            buttonTitle: "Edit track",
            label: "Track Name",
          }}
          showColorPicker={true}
          submitAction={editTrackRequest}
          trackId={trackId}
        />
      </Modal>
    </>
  );

  return (
    <>
      <div
        className={
          classes.statusBar +
          " " +
          (addShadowBottom ? classes.shadowBottom : "")
        }
      >
        <div
          className={classes.statusColorBox}
          style={{ borderColor: `${colorCode}` }}
        ></div>
        <h4 className="heading--4">
          {statusName} <span>{taskCount}</span>
        </h4>
        <button className="btn dots" onClick={handleMenuChange}>
          <svg className="svg">
            <use href={icons + "#icon-horizontal-dots"}></use>
          </svg>
        </button>
        {isMenuOpen && <Overlay onClickAction={handleMenuChange} />}
        {isMenuOpen && (
          <DotMenu
            onDeleteAction={onDeleteTrack}
            onEditAction={handleEditTrackModal}
            comoponentName={"track"}
            onMenuChange={handleMenuChange}
          />
        )}
      </div>
      {editTrack && editTrackModal}
    </>
  );
}

export default TaskStatusBar;
