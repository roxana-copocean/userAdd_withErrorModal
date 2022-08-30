import React, { useState, useRef } from 'react';
import Card from '../UI/Card';
import styles from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from './ErrorModal';

export default function AddUser(props) {
	const nameInputRef = useRef();
	const ageInputRef = useRef();

	const [ error, setError ] = useState();

	const addUserHandler = (event) => {
		event.preventDefault();
		const eneteredName = nameInputRef.current.value;
		const enteredUserAge = ageInputRef.current.value;
		if (eneteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
			setError({
				title: 'Invalid input',
				message: 'Please enter a valid name and age!'
			});
			return;
		}
		if (+enteredUserAge < 1) {
			setError({
				title: 'Invalid age!',
				message: 'Please enter a valid age!'
			});
			return;
		}
		props.onAddUser(eneteredName, enteredUserAge);
		nameInputRef.current.value = '';
		ageInputRef.current.value = '';
	};

	const errorHandler = () => {
		setError(null);
	};

	return (
		<React.Fragment>
			{error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
			<Card className={styles.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input type="text" id="username" ref={nameInputRef} />
					<label htmlFor="age">Age (Years)</label>
					<input type="number" id="age" ref={ageInputRef} />
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</React.Fragment>
	);
}
