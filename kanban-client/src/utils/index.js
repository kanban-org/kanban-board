import { SUBTASK_THUMBNAILS } from "./constants";
import { v4 as uuidv4 } from "uuid";

export function isCamelCase(str) {
  return /^[a-z]\w*([A-Z][\w]*)*$/.test(str);
}
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}

export function addCamelCase(target, str) {
  const lowercaseStr = str.toLowerCase();

  if (target === "") return lowercaseStr;
  else return target + capitalizeFirstLetter(lowercaseStr);
}

export function toCamelCase(str) {
  if (isCamelCase(str)) return str;

  return str.split(" ").reduce(addCamelCase, "");
}

// Binary search function to find the index where the new task should be inserted
export const addTaskInTrackOrder = (trackOrder, task, tasks) => {
  let left = 0;
  let right = trackOrder.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let taskAtMid = tasks[trackOrder[mid]];

    if (taskAtMid.rank === task.rank) {
      return mid;
    } else if (taskAtMid.rank < task.rank) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};

export function generateUUID() {
  let uuid = uuidv4().substr(0, 6).replace(/-/g, "").toUpperCase();
  return uuid;
}

export function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export const getRandomSubtaskThumbnails = () =>
  SUBTASK_THUMBNAILS[Math.floor(getRandomNumber(0, SUBTASK_THUMBNAILS.length))];
