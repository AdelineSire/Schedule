const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	title: String,
	description: String,
	location: String,
	notDoneCount: Number,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
