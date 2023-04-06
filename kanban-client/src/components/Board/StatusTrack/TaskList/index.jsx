import classes from "./TaskList.module.scss";

import TaskBox from "../../../Task/TaskBox";
import { useSelector } from "react-redux";
import { selectTaskIdsOfTrack } from "../../../../state/reducers/selectors/task";

function TaskList({ trackId, trackName, onScrollHandler }) {
  const taskIds = useSelector((state) => selectTaskIdsOfTrack(state, trackId));

  return (
    <ul
      className={classes.taskList + " scrollbar"}
      role={["list"]}
      onScroll={onScrollHandler}
    >
      {taskIds.map((taskId) => (
        <TaskBox key={taskId} taskId={taskId} currentTrack={trackName} />
      ))}
    </ul>
  );
}

export default TaskList;
