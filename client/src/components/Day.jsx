import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

import Task from './Task';

import './Day.css';

const Day = ({ day, tasks, dropped }) => {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: ItemTypes.TASK,
		drop: () => ({ name: day.dayDate }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	const isActive = canDrop && isOver;

	return (
		<div className='day'>
			<p className='day-name'>{day.dayName}</p>
			<p className='day-date'>{day.dayDate}</p>
			<div ref={drop} className={isActive ? 'dropzone highlight' : 'dropzone'}>
				{tasks.map((task) => (
					<Task key={task._id} task={task} dropped={dropped} />
				))}
			</div>
		</div>
	);
};

export default Day;
