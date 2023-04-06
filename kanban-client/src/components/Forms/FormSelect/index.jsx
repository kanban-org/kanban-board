import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import classes from "./FormSelect.module.scss";
import { useSelector } from "react-redux";
import { selectTracks } from "../../../state/reducers/selectors/track";

const FormSelect = ({ optionSelected, statusChange }) => {
  const { statusId: value, statusName: label } = optionSelected;
  let option = { value, label };

  const tracks = useSelector(selectTracks);
  const options = tracks.map((track, index) => {
    return {
      value: track.id,
      label: track.trackName,
    };
  });

  const onSelect = (option) => {
    const status = {
      statusId: option.value,
      statusName: option.label,
    };
    statusChange(status);
  };

  if (!option.value || !option.label) {
    option = options[0];
  }

  return (
    <div>
      <Dropdown
        options={options}
        onChange={(o) => onSelect(o)}
        value={option}
        placeholder={option.label}
        className={classes.dropdown}
        controlClassName={classes.dropdownControl}
        menuClassName={classes.dropdownMenu + " scrollbar"}
        arrowClosed={<span className={classes.arrowClosed} />}
        arrowOpen={<span className={classes.arrowOpen} />}
      />
    </div>
  );
};

export default FormSelect;
