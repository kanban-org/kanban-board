import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import classes from "./FormSelect.module.scss";

function FormSelect() {
	const onSelect = (option) => {
		console.log("You selected ", option.label);
		console.log("You selected ", option.value);
		//this.setState({selected: option})
	};

	const options = [
		{ value: 0, label: "Todo" },
		{ value: 1, label: "Doing" },
		{ value: 2, label: "Done" },
		{ value: 3, label: "Archived" },
		{ value: 4, label: "Deleted" },
		{ value: 5, label: "Blocked" }
	];

	const defaultOption = options[2];

	return (
		<div>
			<Dropdown
				options={options}
				onChange={(o) => onSelect(o)}
				value={defaultOption}
				placeholder={defaultOption.label}
				className={classes.dropdown}
				controlClassName={classes.dropdownControl}
				menuClassName={classes.dropdownMenu + " scrollbar"}
				arrowClosed={<span className={classes.arrowClosed} />}
				arrowOpen={<span className={classes.arrowOpen} />}
			/>
		</div>
	);
}

export default FormSelect;
