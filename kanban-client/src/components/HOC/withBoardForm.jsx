const withBoardForm = (WrappedComponent) => {
  return function BoardFormWrapper(props) {
    const { handleModal, initialValues, submitAction, ...rest } = props;
    function handleBoardFormSubmit(data) {
      handleModal();
      submitAction(data);
    }
    return (
      <>
        <WrappedComponent
          initialValues={initialValues}
          handleBoardFormSubmit={handleBoardFormSubmit}
          {...rest}
        />
      </>
    );
  };
};

export default withBoardForm;
