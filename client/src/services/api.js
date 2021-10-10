import axios from 'axios';
import API_URL from './config';

const getWeek = () => {
	return axios.get(API_URL + 'week');
};

const createTask = (task) => {
	return axios.post(API_URL + 'task', {
		title: task.title,
		description: task.description,
	});
};

const getTasks = () => {
	return axios.get(API_URL + 'task');
};

const deleteTask = (id) => {
	return axios.post(API_URL + 'task/' + id);
};

const updateTask = (task) => {
	return axios.put(API_URL + 'task/' + task._id, {
		title: task.title,
		description: task.description,
		location: task.location,
		notDoneCount: task.notDoneCount,
	});
};

export { getWeek, createTask, getTasks, deleteTask, updateTask };
