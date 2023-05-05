import Checkbox from "../../Forms/Checkbox";
import Tooltip from "../../UI/Tooltip";
import classes from "./ViewTaskModal.module.scss";
import formClasses from "../../Forms/Forms.module.scss";
import icons from "../../../img/symbol-defs.svg";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";

function ViewTaskModal({
  id,
  taskTitle,
  taskDesc,
  subtasks,
  totalSubtasks,
  completedSubtasks,
}) {
  const { editTaskRequest, editSubtaskRequest } = useActions();

  const [isInputBlurred, setIsInputBlurred] = useState(false);

  const formik = useFormik({
    initialValues: {
      taskTitle: taskTitle,
      taskDesc: taskDesc,
      subtasks: subtasks,
    },
  });

  const updateSubtaskStatus = useCallback(
    (subtaskId) => {
      const subtasks = formik.values.subtasks.map((subtask) => {
        if (subtask.id === subtaskId) {
          subtask.status = !subtask.status;
        }
        return subtask;
      });
      formik.setFieldValue("subtasks", subtasks);
      editSubtaskRequest({ taskId: id, subtasks });
    },
    [formik, id, editSubtaskRequest]
  );

  useEffect(() => {
    if (formik.dirty && isInputBlurred) {
      Object.assign(formik.values, { id: id });
      editTaskRequest(formik.values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTaskRequest, formik.dirty, formik.values, isInputBlurred]);

  return (
    <form
      className={classes.container}
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <textarea
        type="text"
        id="taskTitle"
        className={classes.taskInput + " heading--3 mb-sm"}
        name="taskTitle"
        placeholder="Add Task Title..."
        value={formik.values.taskTitle}
        onChange={formik.handleChange}
        onBlur={() => setIsInputBlurred(!isInputBlurred)}
        style={{
          marginTop: "-0.8rem",
          marginBottom: "0.5rem",
        }}
      />
      <textarea
        type="text"
        id="taskDesc"
        className={classes.taskInput}
        name="taskDesc"
        placeholder="Add Task Description..."
        value={formik.values.taskDesc}
        onChange={formik.handleChange}
        onBlur={() => setIsInputBlurred(!isInputBlurred)}
        style={{
          marginBottom: "0.5rem",
          fontSize: "1.3rem",
          fontWeight: "400",
          color: "var(--color-grey)",
        }}
      />
      <div
        className={
          formClasses.subtask__heading + " margin-left-1 margin-top-0_5"
        }
      >
        <label htmlFor="subtask" className={formClasses.form__label}>
          Subtasks
        </label>
        <Tooltip content="Add New Subtask" delay="0" direction="left">
          <button
            className="btn btn-overlay margin-right-1"
            onClick={() => console.log("Add New Task Clicked")}
          >
            <svg
              className="svg"
              style={{ paddingTop: "0.2rem", paddingLeft: "0.2rem" }}
            >
              <use href={icons + "#icon-plus"}></use>
            </svg>
          </button>
        </Tooltip>
      </div>
      <div className={classes.inputContainer + " scrollbar"}>
        {subtasks.map((subtask) => {
          return (
            <Checkbox
              label={subtask.subtaskDesc}
              id={subtask.id}
              status={subtask.status}
              key={subtask.id}
              updateSubtaskStatus={updateSubtaskStatus}
            />
          );
        })}
      </div>
    </form>
  );
}

export default ViewTaskModal;
