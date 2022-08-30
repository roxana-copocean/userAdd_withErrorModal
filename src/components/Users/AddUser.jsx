import React, { useState } from 'react';
import Card from '../UI/Card';
import styles from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from './ErrorModal';

export default function AddUser(props) {
	const [ enteredUsername, setEnteredUsername ] = useState('');
	const [ enteredAge, setEnteredAge ] = useState('');
	const [ error, setError ] = useState();

	const usernameChangeHandler = (event) => {
		setEnteredUsername(event.target.value);
	};

	const ageChangeHandler = (event) => {
		setEnteredAge(event.target.value);
	};
	const addUserHandler = (event) => {
		event.preventDefault();
		if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
			setError({
				title: 'Invalid input',
				message: 'Please enter a valid name and age!'
			});
			return;
		}
		if (+enteredAge < 1) {
			setError({
				title: 'Invalid age!',
				message: 'Please enter a valid age!'
			});
			return;
		}
		props.onAddUser(enteredUsername, enteredAge);
		setEnteredAge('');
		setEnteredUsername('');
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
					<input type="text" id="username" value={enteredUsername} onChange={usernameChangeHandler} />
					<label htmlFor="age">Age (Years)</label>
					<input type="number" id="age" value={enteredAge} onChange={ageChangeHandler} />
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</React.Fragment>
	);
}
