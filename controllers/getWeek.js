const express = require('express');
const router = express.Router();

const convertDay = (num) => {
	const days = [
		'Dimanche',
		'Lundi',
		'Mardi',
		'Mercredi',
		'Jeudi',
		'Vendredi',
		'Samedi',
	];
	return days[num];
};

const getWeek = (req, res) => {
	const days = [];
	for (let i = 0; i < 7; i++) {
		const newDay = new Date();
		newDay.setDate(newDay.getDate() + i);
		const day = {
			dayName: convertDay(newDay.getDay()),
			dayDate: newDay.toLocaleDateString().slice(0, 5),
		};
		days.push(day);
	}
	res.json({
		success: true,
		data: days,
	});
};

router.route('/').get(getWeek);
module.exports = router;
