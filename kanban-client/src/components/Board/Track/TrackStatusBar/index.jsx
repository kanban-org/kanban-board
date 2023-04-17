import { useCallback, useState } from "react";
import DotMenu from "../../../DotMenu";
import Overlay from "../../../UI/Overlay";
import icons from "../../../../img/symbol-defs.svg";

import classes from "./TrackStatusBar.module.scss";
import { useActions } from "../../../../hooks/useActions";
import Modal from "../../../UI/Modal";
import withModalForm from "../../../HOC/withModalForm";
import ModalForm from "../../../ModalForm";
import { useSelector } from "react-redux";
import { selectTasksCountOfTrack } from "../../../../state/reducers/selectors/task";
import Tooltip from "../../../UI/Tooltip";

function TrackStatusBar({ colorCode, trackId, trackName, addShadowBottom }) {
  const [editTrack, setEditTrack] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { deleteTrackRequest, editTrackRequest, addNewTaskRequest } =
    useActions();

  const taskCount = useSelector((state) =>
    selectTasksCountOfTrack(state, trackId)
  );

  const EditTrackForm = withModalForm(ModalForm);
  const AddTaskForm = withModalForm(ModalForm);

  const handleMenuChange = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleEditTrackModal = useCallback(() => {
    setEditTrack(!editTrack);
  }, [editTrack]);

  const handleAddTaskModal = useCallback(() => {
    setAddTask(!addTask);
  }, [addTask]);

  const onDeleteTrack = useCallback(() => {
    deleteTrackRequest(trackId);
    handleMenuChange();
  }, [deleteTrackRequest, trackId, handleMenuChange]);

  const editTrackModal = (
    <>
      <Overlay />
      <Modal
        styles={{ height: "max-content" }}
        onCloseModal={handleEditTrackModal}
      >
        <EditTrackForm
          handleModal={handleEditTrackModal}
          showColorPicker={true}
          submitAction={editTrackRequest}
          trackId={trackId}
          formId="editTrack"
        />
      </Modal>
    </>
  );

  const addTaskModal = (
    <>
      <Overlay />
      <Modal
        styles={{ height: "max-content" }}
        onCloseModal={handleAddTaskModal}
      >
        <AddTaskForm
          handleModal={handleAddTaskModal}
          submitAction={addNewTaskRequest}
          taskForm={true}
          trackId={trackId}
          formId="addTask"
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
        <h4 className="heading--5 margin-left-0_5">
          <span style={{ color: "var(--color-text)" }}>{trackName}</span>{" "}
          {taskCount}
        </h4>
        <Tooltip content="Add New Task" delay="0" direction="left">
          <button
            className="btn btn-overlay margin-right-0_5"
            onClick={handleAddTaskModal}
          >
            <svg
              className="svg"
              style={{ paddingTop: "0.2rem", paddingLeft: "0.2rem" }}
            >
              <use href={icons + "#icon-plus"}></use>
            </svg>
          </button>
        </Tooltip>
        <button className="btn btn-overlay" onClick={handleMenuChange}>
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
      {addTask && addTaskModal}
      {editTrack && editTrackModal}
    </>
  );
}

export default TrackStatusBar;
