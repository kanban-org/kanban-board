const withModalForm = (WrappedComponent) => {
  return function ModalFormWrapper(props) {
    const { handleModal, initialValues, submitAction, ...rest } = props;
    function handleBoardFormSubmit(data) {
      handleModal();
      submitAction(data);
    }
    return (
      <>
        <WrappedComponent
          initialValues={initialValues}
          handleFormSubmit={handleBoardFormSubmit}
          {...rest}
        />
      </>
    );
  };
};

export default withModalForm;
