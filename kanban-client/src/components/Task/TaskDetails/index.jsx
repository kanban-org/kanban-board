function Task({ id, title, totalSubtasks, comepletedSubtasks }) {
  return (
    <>
      <h3 className="heading--4 bold">{title}</h3>
      <h6 className="heading--6">
        {comepletedSubtasks} of {totalSubtasks} subtasks
      </h6>
    </>
  );
}

export default Task;
