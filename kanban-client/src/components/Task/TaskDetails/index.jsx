function Task({ id, title, totalSubtasks, completedSubtasks }) {
  return (
    <>
      <h3 className="heading--4 bold">{title}</h3>
      <h6 className="heading--6">
        {completedSubtasks} of {totalSubtasks} subtasks
      </h6>
    </>
  );
}

export default Task;
