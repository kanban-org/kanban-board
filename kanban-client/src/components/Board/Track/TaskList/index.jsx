import classes from "./TaskList.module.scss";
import TaskBox from "../../../Task/TaskBox";
import { useSelector } from "react-redux";
import { selectTasksOfTrack } from "../../../../state/reducers/selectors/task";
import { memo } from "react";

const TaskList = ({
  trackId,
  trackName,
  onScrollHandler,
  provided,
  snapshot,
}) => {
  const tasks = useSelector((state) => selectTasksOfTrack(state, trackId));

  return (
    <div
      className={
        classes.taskList +
        " scrollbar" +
        (snapshot.isDraggingOver ? ` ${classes.draggedOver}` : "")
      }
      onScroll={onScrollHandler}
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      {tasks.map((task, index) => (
        <TaskBox
          task={task}
          key={task.id}
          currentTrack={trackName}
          index={index}
          isDraggingOver={snapshot.isDraggingOver}
        />
      ))}
      {provided.placeholder}
    </div>
  );
};

export default memo(TaskList);
