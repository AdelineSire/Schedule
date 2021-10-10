import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import TaskForm from './components/TaskForm';
import TasksList from './components/TasksList';
import Day from './components/Day';

import { getWeek, getTasks, deleteTask, updateTask } from './services/api.js';

import './App.css';

function App() {
	const [week, setWeek] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [showTask, setShowTask] = useState(false);

	useEffect(() => {
		getTasks().then((res) => {
			setTasks(res.data.data);
		});
		getWeek().then((res) => {
			setWeek(res.data.data);
		});
	}, []);

	const handleClose = () => {
		setShowTask(false);
	};

	const removeTask = (id) => {
		deleteTask(id).then(
			getTasks().then((response) => {
				setTasks(response.data.data);
			})
		);
	};

	const filterTasks = (location) => {
		return tasks.filter((task) => task.location === location);
	};

	const dropped = (item, monitor) => {
		const dropResult = monitor.getDropResult();
		if (item && dropResult) {
			setTasks(
				tasks.map((task) => {
					if (task._id === item.id) {
						task.location = dropResult.name;
						updateTask(task);
					}
					return task;
				})
			);
		} else {
			setTasks(tasks);
			return tasks;
		}
	};

	return (
		<div className='app'>
			<div className='tasks'>
				<div className='add-button' onClick={() => setShowTask(true)}>
					<AddCircleOutlineIcon />
					<p>Ajouter</p>
				</div>
				{showTask && <TaskForm handleClose={handleClose} />}
				<TasksList
					tasks={filterTasks('tasksList')}
					dropped={dropped}
					removeTask={removeTask}
				/>
			</div>
			<div className='week'>
				{week.map((day) => {
					return (
						<Day
							key={uuidv4()}
							tasks={filterTasks(day.dayDate)}
							dropped={dropped}
							day={day}
							removeTask={removeTask}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
