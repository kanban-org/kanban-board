import Checkbox from "../../Forms/Checkbox";
import classes from "./ViewTaskModal.module.scss";

function ViewTaskModal({
  id,
  taskTitle,
  taskDesc,
  subtasks,
  totalSubtasks,
  comepletedSubtasks,
  allColumnNames,
  currentColumn,
}) {
  return (
    <div className={classes.container}>
      <h3 className="heading--3 mb-sm">{taskTitle}</h3>
      <p className="heading--6 mb-sm">{taskDesc}</p>
      <h5 className="heading--5 mb-xs">
        Subtasks ({2} of {3})
      </h5>
      <div className={classes.inputContainer + " scrollbar"}>
        {subtasks.map((subtask) => {
          return (
            <Checkbox
              label={subtask.description}
              id={subtask.id}
              checked={subtask.completed}
              key={subtask.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ViewTaskModal;
