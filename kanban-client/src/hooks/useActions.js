import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, thunkCreators } from "../state";

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(
      { ...thunkCreators, ...actionCreators },
      dispatch
    );
  }, [dispatch]);
};
