export const FORM_CONSTANTS = {
  addBoardForm: {
    boardName: "",
    heading: "Add board",
    buttonTitle: "Add new board",
    label: "Board Name",
  },
  editBoardForm: {
    boardName: "",
    heading: "Edit board",
    buttonTitle: "Edit board",
    label: "Board Name",
  },
  editTrackForm: {
    trackName: "",
    color: "#3f51b5",
    heading: "Edit track",
    buttonTitle: "Edit track",
    label: "Track Name",
  },
  addTrackForm: {
    trackName: "",
    color: "#3f51b5",
    heading: "Add track",
    buttonTitle: "Add new track",
    label: "Track Name",
  },
  addTaskForm: {
    taskTitle: "",
    taskDescription: "",
    heading: "Add task",
    buttonTitle: "Add new task",
    label: "Task Title",
    subtasks: [
      {
        id: "ygh74e",
        subtaskValue: "",
        placeholder: "e.g Shard data",
      },
      {
        id: "w355yf",
        subtaskValue: "",
        placeholder: "e.g Create a Migration file",
      },
    ],
  },
};

export const SUBTASK_THUMBNAILS = [
  "e.g Shard data",
  "e.g Split data",
  "e.g Add input field",
  "e.g POC",
  "e.g Add new feature",
  "e.g Create a Migration file",
  "e.g Seperate Model",
  "e.g Create a controller",
  "e.g Create a Notification Service",
  "e.g Create a Mail Service",
  "e.g Create a Payment Service",
  "e.g Create a Subscription Service",
  "e.g Create a Billing Service",
  "e.g Create a Queue Service",
  "e.g Create a Cache Service",
  "e.g Create a Search Service",
  "e.g Create a Test Service",
  "e.g Create a Deployment Service",
  "e.g Create a Continous Integration Service",
  "e.g Create a Continous Deployment Service",
  "e.g Create a Continous Integration/Deployment Service",
];

export const ADD_BOARD_FORM = "addBoardForm";
export const EDIT_BOARD_FORM = "editBoardForm";
export const ADD_TRACK_FORM = "addTrackForm";
export const EDIT_TRACK_FORM = "editTrackForm";
export const ADD_TASK_FORM = "addTaskForm";
