export const validateFieldsOfForm = (values, formId) => {
  const errors = {};

  switch (formId) {
    case "addBoard":
      if (!values?.boardName?.trim()) {
        errors.boardName = "Board name is required";
      }
      break;
    case "editBoard":
      if (!values?.boardName?.trim()) {
        errors.boardName = "Board name is required";
      }
      break;
    case "addTrack":
      if (!values?.trackName?.trim()) {
        errors.trackName = "Track name is required";
      }
      break;
    case "editTrack":
      if (!values?.trackName?.trim()) {
        errors.trackName = "Track name is required";
      }
      break;
    case "addTask":
      if (!values?.taskTitle?.trim()) {
        errors.taskTitle = "Task title is required";
      }
      break;
    default:
      break;
  }

  return errors;
};
