import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Visibility from '@material-ui/icons/Visibility';

import './Task.css';

const Task = ({ task, dropped, removeTask }) => {
	const id = task._id;
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.TASK,
		item: { id },
		end: dropped,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return (
		<div ref={drag} className={isDragging ? 'task highlight' : 'task'}>
			<p>{task.title}</p>
			{task.notDoneCount !== 0 && (
				<div className='count'>{task.notDoneCount}</div>
			)}
			<div className='view'>
				<Visibility style={{ fontSize: 16 }} />
			</div>
			<div className='delete' onClick={() => removeTask(task._id)}>
				<DeleteForeverIcon style={{ fontSize: 16 }} />
			</div>
		</div>
	);
};

export default Task;
