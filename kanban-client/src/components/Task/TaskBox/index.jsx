import { useState } from "react";
import Modal from "../../UI/Modal";
import Overlay from "../../UI/Overlay";
import ViewTaskModal from "../ViewTask";
import TaskDetails from "../TaskDetails";
import classes from "./TaskBox.module.scss";

function TaskBox({ task, allColumnNames, currentColumn }) {
  const [viewTask, setViewTask] = useState(false);

  const subtasks = task.subtasks;

  let comepletedSubtasks = 0;
  const totalSubtasks = subtasks.length;

  subtasks.forEach((subtask) => {
    if (subtask.completed === true) comepletedSubtasks++;
  });

  const onViewTask = () => {
    setViewTask(true);
  };

  const taskDetailModal = (
    <>
      <Overlay />
      <Modal onCloseModal={() => setViewTask(false)}>
        <ViewTaskModal
          {...task}
          totalSubtasks={totalSubtasks}
          comepletedSubtasks={comepletedSubtasks}
          allColumnNames={allColumnNames}
          currentColumn={currentColumn}
        />
      </Modal>
    </>
  );

  return (
    <>
      <li
        className={classes.taskBox}
        key={task.id}
        onClick={() => onViewTask()}
      >
        <TaskDetails
          id={task.id}
          title={task.title}
          totalSubtasks={totalSubtasks}
          comepletedSubtasks={comepletedSubtasks}
        />
      </li>

      {viewTask && taskDetailModal}
    </>
  );
}

export default TaskBox;
