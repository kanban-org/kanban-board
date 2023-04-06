import classes from "./TaskList.module.scss";

import TaskBox from "../../../Task/TaskBox";
import { useSelector } from "react-redux";
import { selectTasksOfTrack } from "../../../../state/reducers/selectors/task";

function TaskList({ trackId, trackName, onScrollHandler }) {
  const tasks = useSelector((state) => selectTasksOfTrack(state, trackId));

  return (
    <ul
      className={classes.taskList + " scrollbar"}
      role={["list"]}
      onScroll={onScrollHandler}
    >
      {tasks.map((task) => (
        <TaskBox task={task} key={task.id} currentTrack={trackName} />
      ))}
    </ul>
  );
}

export default TaskList;
