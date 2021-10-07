import { useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import TaskForm from './components/TaskForm';

import './App.css';

function App() {
	const [showTask, setShowTask] = useState(false);
	console.log('showTask', showTask);

	const handleClose = () => {
		setShowTask(false);
	};

	return (
		<div className='app'>
			<div className='add-button' onClick={() => setShowTask(true)}>
				<AddCircleOutlineIcon />
				<p>Ajouter</p>
			</div>
			{showTask && <TaskForm handleClose={handleClose} />}
		</div>
	);
}

export default App;
