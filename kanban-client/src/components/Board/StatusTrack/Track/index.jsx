import classes from "./Track.module.scss";
import TrackStatusBar from "../TrackStatusBar";
import TaskList from "../TaskList";
import { useScrollShadow } from "../../../../hooks/useScrollShadow";
import { useSelector } from "react-redux";
import { selectTrackById } from "../../../../state/reducers/selectors/track";
import { Droppable } from "react-beautiful-dnd";
import { memo } from "react";

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
        trackName={trackName}
        addShadowBottom={applyBoxShadow}
      />
      <Droppable
        droppableId={trackId}
        ignoreContainerClipping={true}
        direction="vertical"
      >
        {(provided, snapshot) => (
          <TaskList
            trackId={trackId}
            trackName={trackName}
            onScrollHandler={onScrollHandler}
            provided={provided}
            snapshot={snapshot}
          />
        )}
      </Droppable>
    </div>
  );
}

export default memo(Track);
