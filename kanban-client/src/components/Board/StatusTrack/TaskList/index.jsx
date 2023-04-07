import classes from "./TaskList.module.scss";
import TaskBox from "../../../Task/TaskBox";
import { useSelector } from "react-redux";
import { selectTaskIdsOfTrack } from "../../../../state/reducers/selectors/task";
import { memo } from "react";

const TaskList = ({
  trackId,
  trackName,
  onScrollHandler,
  provided,
  snapshot,
}) => {
  const taskIds = useSelector((state) => selectTaskIdsOfTrack(state, trackId));

  return (
    <div
      className={
        classes.taskList +
        " scrollbar" +
        (snapshot.isDraggingOver ? ` ${classes.draggedOver}` : "")
      }
      role={["list"]}
      onScroll={onScrollHandler}
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      {taskIds.map((taskId, index) => (
        <TaskBox
          key={taskId}
          taskId={taskId}
          currentTrack={trackName}
          index={index}
        />
      ))}
      {provided.placeholder}
    </div>
  );
};

export default memo(TaskList);
