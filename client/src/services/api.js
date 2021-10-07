import axios from 'axios';
import API_URL from './config';

const createTask = (task) => {
	console.log('task in createTask: ', task);
	return axios.post(API_URL + 'task', {
		title: task.title,
		description: task.description,
	});
};

export { createTask };
