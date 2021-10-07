import axios from 'axios';
import API_URL from './config';

const createTask = (task) => {
	console.log('task in createTask: ', task);
	return axios.post(API_URL + 'task', {
		title: task.title,
		description: task.description,
	});
};

const getTasks = () => {
	return axios.get(API_URL + 'task');
};

const deleteTask = (id) => {
	console.log('id in deleteTask in api', id);
	return axios.post(API_URL + 'task/' + id);
};

const updateTask = (task) => {
	return axios.put(API_URL + 'task/' + task._id, {
		task,
	});
};

export { createTask, getTasks, deleteTask, updateTask };
