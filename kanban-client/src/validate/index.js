import {
  ADD_BOARD_FORM,
  ADD_TASK_FORM,
  ADD_TRACK_FORM,
  EDIT_BOARD_FORM,
  EDIT_TRACK_FORM,
} from "../utils/constants";

export const validateFieldsOfForm = (values, formId) => {
  const errors = {};

  switch (formId) {
    case ADD_BOARD_FORM:
      if (!values?.boardName?.trim()) {
        errors.boardName = "Board name is required";
      }
      break;
    case EDIT_BOARD_FORM:
      if (!values?.boardName?.trim()) {
        errors.boardName = "Board name is required";
      }
      break;
    case ADD_TRACK_FORM:
      if (!values?.trackName?.trim()) {
        errors.trackName = "Track name is required";
      }
      break;
    case EDIT_TRACK_FORM:
      if (!values?.trackName?.trim()) {
        errors.trackName = "Track name is required";
      }
      break;
    case ADD_TASK_FORM:
      if (!values?.taskTitle?.trim()) {
        errors.taskTitle = "Task title is required";
      }
      break;
    default:
      break;
  }

  return errors;
};
