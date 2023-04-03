import React from "react";
import classes from "./Track.module.scss";

import TaskStatusBar from "../TaskStatusBar";
import TaskList from "../TaskList";
import { useScrollShadow } from "../../../../hooks/useScrollShadow";
import { useSelector } from "react-redux";
import { selectTrackById } from "../../../../state/reducers/selectors/track";

function Track({ trackId }) {
  const { applyBoxShadow, onScrollHandler } = useScrollShadow(false);

  const track = useSelector((state) => selectTrackById(state, trackId));
  const { trackName, colorCode } = track;

  // const tasks = useSelector((state) => selectTasksByTrack(state, trackId))
  //! TODO: taskCount,

  return (
    <div className={classes.track}>
      <TaskStatusBar
        colorCode={colorCode}
        // taskCount={totalTasks}
        statusName={trackName}
        addShadowBottom={applyBoxShadow}
      />
      {/* <TaskList
				tasks={tasks}
				allColumns={allColumns}
				columnName={columnName}
				onScrollHandler={onScrollHandler}
			/> */}
    </div>
  );
}

export default Track;
