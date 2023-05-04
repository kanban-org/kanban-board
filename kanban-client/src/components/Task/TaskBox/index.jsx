import { memo, useCallback, useState } from "react";
import Modal from "../../UI/Modal";
import Overlay from "../../UI/Overlay";
import ViewTaskModal from "../ViewTask";
import TaskDetails from "../TaskDetails";
import classes from "./TaskBox.module.scss";
import { Draggable } from "react-beautiful-dnd";
import icons from "../../../img/symbol-defs.svg";
import Tooltip from "../../UI/Tooltip";
import { useSelector } from "react-redux";
import { selectCountOfCompletedSubtasks } from "../../../state/reducers/selectors/task";

function TaskBox({ task, currentTrack, index, isDraggingOver }) {
  const [viewTask, setViewTask] = useState(false);

  const handleViewTaskModal = useCallback(() => {
    setViewTask(!viewTask);
  }, [viewTask]);

  const subtasks = task.Subtasks || task.subtasks || [];

  const completedSubtasks = useSelector((state) =>
    selectCountOfCompletedSubtasks(state, task.id)
  );

  const totalSubtasks = subtasks.length;

  const taskDetailModal = (
    <>
      <Overlay onClick={handleViewTaskModal} />
      <Modal
        onCloseModal={handleViewTaskModal}
        styles={{
          width: "50rem",
        }}
      >
        <ViewTaskModal
          {...task}
          subtasks={subtasks}
          totalSubtasks={totalSubtasks}
          completedSubtasks={completedSubtasks}
        />
      </Modal>
    </>
  );

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className={
              classes.taskBox +
              " " +
              (isDraggingOver ? classes.taskDragging : "")
            }
            key={task.id}
            onClick={handleViewTaskModal}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <TaskDetails
              id={task.id}
              title={task.taskTitle}
              completedSubtasks={completedSubtasks}
              totalSubtasks={totalSubtasks}
            />
            <div
              className={classes.priority + " margin-top-0_5 margin-left-0_5"}
            >
              <Tooltip content="Set priority" direction="right">
                <button className="btn btn-overlay">
                  <svg
                    className="svg"
                    style={{ paddingTop: "0.2rem", paddingLeft: "0.2rem" }}
                  >
                    <use href={icons + "#icon-low-priority"}></use>
                  </svg>
                </button>
              </Tooltip>
            </div>
          </div>
        )}
      </Draggable>

      {viewTask && taskDetailModal}
    </>
  );
}

export default memo(TaskBox);
