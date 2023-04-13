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
