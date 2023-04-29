import { memo, useCallback, useState } from "react";
import Modal from "../../UI/Modal";
import Overlay from "../../UI/Overlay";
import ViewTaskModal from "../ViewTask";
import TaskDetails from "../TaskDetails";
import classes from "./TaskBox.module.scss";
import { Draggable } from "react-beautiful-dnd";
import icons from "../../../img/symbol-defs.svg";
import Tooltip from "../../UI/Tooltip";

function TaskBox({ task, currentTrack, index, isDraggingOver }) {
  const [viewTask, setViewTask] = useState(false);

  const handleViewTaskModal = useCallback(() => {
    setViewTask(!viewTask);
  }, [viewTask]);
  // const task = useSelector((state) => selectTaskById(state, taskId));
  // console.log(task);
  // const subtasks = task.subtasks;

  // let comepletedSubtasks = 0;
  // const totalSubtasks = subtasks.length;

  // subtasks.forEach((subtask) => {
  //   if (subtask.completed === true) comepletedSubtasks++;
  // });

  let subtasks = [
    {
      id: 1,
      description: "subtask 1",
      completed: true,
    },
    {
      id: 2,
      description: "subtask 2",
      completed: true,
    },
    {
      id: 3,
      description: "subtask 3",
      completed: false,
    },
  ];

  const taskDetailModal = (
    <>
      <Overlay onClick={handleViewTaskModal} />
      <Modal onCloseModal={handleViewTaskModal}>
        <ViewTaskModal
          {...task}
          subtasks={subtasks}
          // totalSubtasks={totalSubtasks}
          // comepletedSubtasks={comepletedSubtasks}
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
              // totalSubtasks={totalSubtasks}
              // comepletedSubtasks={comepletedSubtasks}
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
