import { useDrop } from 'react-dnd';

import Task from './Task';
import { ItemTypes } from './ItemTypes';

import './TasksList.css';

const TasksList = ({ tasks, dropped, removeTask }) => {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: ItemTypes.TASK,
		drop: () => ({ name: 'tasksList' }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	const isActive = canDrop && isOver;

	return (
		<div className='tasks-list'>
			<h2>A faire</h2>
			<div ref={drop} className={isActive ? 'dropzone highlight' : 'dropzone'}>
				{tasks.map((task) => (
					<Task
						key={task._id}
						task={task}
						dropped={dropped}
						removeTask={removeTask}
					/>
				))}
			</div>
		</div>
	);
};

export default TasksList;
