const express = require('express');
const router = express.Router();

const { Task } = require('../models');

const createTask = (req, res) => {
	const newTask = req.body;
	const task = new Task({
		title: newTask.title,
		description: newTask.description,
		location: 'tasksList',
		notDoneCount: 0,
	});
	// console.log('task.notDoneCount: ', task.notDoneCount);

	task.save((err, task) => {
		if (err) {
			res.json({
				success: false,
				message: err.toString(),
			});
			return;
		}
		res.json({
			success: true,
			data: task,
		});
	});
};

const readTasks = (req, res) => {
	Task.find({}, (err, tasks) => {
		if (err !== null) {
			res.json({
				success: false,
				message: err.toString(),
			});
			return;
		}
		res.json({
			success: true,
			data: tasks,
		});
	});
};

const deleteTask = (req, res) => {
	console.log('req: ', req);
	const taskId = req.params.id;

	Task.deleteOne({ _id: taskId }, (err, deletedTask) => {
		if (err) {
			res.json({
				success: false,
				message: err.toString(),
			});
			return;
		}
		if (deletedTask.deletedCount === 0) {
			res.json({
				success: false,
				message: 'The task has not been deleted',
			});
		}
		res.json({
			success: true,
			data: {
				isDeleted: true,
			},
			message: 'The task has been deleted',
		});
	});
};

const updateTask = (req, res) => {
	const taskId = req.params.id;
	console.log('const taskId in updateTask', taskId);
	const newValues = { ...req.body };
	console.log('newValues in updateTask', newValues);

	Task.updateOne({ _id: taskId }, newValues, (err, updatedTask) => {
		if (err !== null) {
			res.json({
				success: false,
				message: err.toString(),
			});
			return;
		}

		if (updatedTask.nModified === 0) {
			res.json({
				success: false,
				message: `The task hasn't been updated.`,
			});
			return;
		}

		res.json({
			success: true,
			data: updatedTask,
			message: `The task with id ${taskId} has been successfully updated`,
		});
	});
};

router.route('/').post(createTask);
router.route('/').get(readTasks);
router.route('/:id').post(deleteTask);
router.route('/:id').put(updateTask);
module.exports = router;
