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

	task
		.save(task)
		.then((res) =>
			res.json({
				success: true,
				data: task,
			})
		)
		.catch((err) => {
			res.json({
				success: false,
				message: err.toString(),
			});
		});
};

// Check if the location is before today and relocate to taskList if so.
const relocate = async () => {
	const today = new Date().toLocaleString().slice(0, 5);
	const tasks = await Task.find({ location: { $lt: today } });
	await Promise.all(
		tasks.map((task) => {
			const count = task.notDoneCount + 1;
			return Task.updateOne(
				{ _id: task.id },
				{
					location: 'tasksList',
					notDoneCount: count,
				}
			);
		})
	);
};

const readTasks = async (req, res) => {
	await relocate();
	Task.find({})
		.then((tasks) => {
			if (tasks === null || tasks === undefined) {
				res.json({
					success: true,
					data: [],
				});
				return;
			}
			res.json({
				success: true,
				data: tasks,
			});
		})
		.catch((err) => {
			res.json({
				success: false,
				message: err.toString(),
			});
		});
};

const deleteTask = (req, res) => {
	const taskId = req.params.id;
	Task.deleteOne({ _id: taskId })
		.then((deletedTask) => {
			if (deletedTask.deletedCount === 0) {
				res.json({
					success: false,
					message: 'The task has not been deleted',
				});
				return;
			}
			res.json({
				success: true,
				data: {
					isDeleted: true,
				},
			});
		})
		.catch((err) => {
			res.json({
				success: false,
				message: err.toString(),
			});
		});
};

const updateTask = (req, res) => {
	const taskId = req.params.id;
	const newValues = { ...req.body };

	Task.updateOne({ _id: taskId }, newValues)
		.then((updatedTask) => {
			if (updatedTask.modifiedCount === 0) {
				res.json({
					success: false,
					message: `The task hasn't been updated.`,
				});
				return;
			}
			res.json({
				success: true,
				data: updatedTask,
			});
		})
		.catch((err) => {
			res.json({
				success: false,
				message: err.toString(),
			});
		});
};

router.route('/').post(createTask);
router.route('/').get(readTasks);
router.route('/:id').post(deleteTask);
router.route('/:id').put(updateTask);
module.exports = router;
