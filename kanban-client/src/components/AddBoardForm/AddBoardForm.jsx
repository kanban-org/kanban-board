import React from "react";
import classes from "../Forms/Forms.module.scss";

function AddBoardForm() {
	return (
		<>
			<h3 className="heading--3 mb-sm">Add new board</h3>
			<form className={classes.form}>
				<div className={classes.form__group}>
					<label htmlFor="boardName" className={classes.form__label}>
						Board Name
					</label>
					<input
						type="text"
						id="boardName"
						className={classes.form__input}
						placeholder="e.g. Platform launch"
					/>
				</div>
				<button className="btn btn-primary btn-sm">Create new board</button>
			</form>
		</>
	);
}

export default AddBoardForm;
