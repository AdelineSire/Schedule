import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Visibility from '@material-ui/icons/Visibility';

import TaskForm from './TaskForm';

import './Task.css';

const Task = ({ task, dropped, removeTask }) => {
	const [showTask, setShowTask] = useState(false);
	const id = task._id;
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.TASK,
		item: { id },
		end: dropped,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	const handleClose = () => {
		setShowTask(false);
	};

	return (
		<div ref={drag} className={isDragging ? 'task highlight' : 'task'}>
			<p>{task.title}</p>
			{task.notDoneCount !== 0 && (
				<div className='count'>{task.notDoneCount}</div>
			)}
			<div className='view'>
				<Visibility
					style={{ fontSize: 16 }}
					onClick={() => setShowTask(true)}
				/>
			</div>
			<div className='delete' onClick={() => removeTask(task._id)}>
				<DeleteForeverIcon style={{ fontSize: 16 }} />
			</div>
			{showTask && <TaskForm currentTask={task} handleClose={handleClose} />}
		</div>
	);
};

export default Task;
