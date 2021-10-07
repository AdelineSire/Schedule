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

const getWeek = () => {
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
	return days;
};

export default getWeek;
