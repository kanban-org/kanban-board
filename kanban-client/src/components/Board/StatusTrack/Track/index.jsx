import classes from "./Track.module.scss";
import TrackStatusBar from "../TrackStatusBar";
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
      <TrackStatusBar
        colorCode={colorCode}
        trackId={trackId}
        // taskCount={totalTasks}
        trackName={trackName}
        addShadowBottom={applyBoxShadow}
      />
      <TaskList
        trackId={trackId}
        // allColumns={allColumns}
        trackName={trackName}
        onScrollHandler={onScrollHandler}
      />
    </div>
  );
}

export default Track;
