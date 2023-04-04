const withBoardForm = (WrappedComponent) => {
  return function BoardFormWrapper(props) {
    const { handleModal, intitialValues, submitAction, ...rest } = props;

    function handleBoardFormSubmit(data) {
      handleModal();
      submitAction(data);
    }
    return (
      <WrappedComponent
        intitialValues={intitialValues}
        handleModal={handleBoardFormSubmit}
        {...rest}
      />
    );
  };
};

export default withBoardForm;
