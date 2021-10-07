import { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import { createTask } from '../services/api';

import './TaskForm.css';

const TaskForm = ({ handleClose }) => {
	const [task, setTask] = useState({
		title: '',
		description: '',
	});

	const handleChange = (e) => {
		const val = e.target.value;
		if (e.target.id === 'task-title') {
			setTask((prevState) => {
				return { ...prevState, title: val };
			});
		}
		if (e.target.id === 'task-description') {
			setTask((prevState) => {
				return { ...prevState, description: val };
			});
		}
	};

	const handleSubmit = (e) => {
		createTask(task);
	};

	return (
		<div className='modal'>
			<div className='task-card'>
				<div className='close-button' onClick={handleClose}>
					Fermer
					<CloseIcon />
				</div>
				<form className='task-form' onSubmit={handleSubmit}>
					<label htmlFor='task-title'>Titre</label>
					<input
						type='text'
						id='task-title'
						value={task.title}
						onChange={(e) => handleChange(e)}
						autoComplete='off'
					/>
					<label htmlFor='task-description'>Description</label>
					<textarea
						id='task-description'
						value={task.description}
						onChange={(e) => handleChange(e)}
						autoComplete='off'
					/>
					<button type='submit' className='submit'>
						Enregistrer
					</button>
				</form>
			</div>
		</div>
	);
};

export default TaskForm;