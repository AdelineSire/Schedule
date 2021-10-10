const express = require('express');
const cors = require('cors');

// App
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// BD connection
const mongoose = require('mongoose');
const dbConfig = require('./dbConfig');
const MONGODB_URI =
	process.env.MONGODB_URI ||
	`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Successfully connected to MongoDB.');
	})
	.catch((err) => {
		console.error('Connection error', err);
		process.exit();
	});

// Controllers
const { task, getWeek } = require('./controllers');

// Routes
app.use('/task', task);
app.use('/week', getWeek);

// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
