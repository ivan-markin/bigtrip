export const dateConvert = (diff) => {
	let day = 86400000;
	let hour = 3600000;
	let minute = 60000;

	if (diff < hour) {
		return Math.floor(diff / minute) + 'm';
	} else if (diff < day && diff > hour) {
		let hours = Math.floor(diff / hour);
		return hours + 'h ' + Math.floor((diff - hours * hour) / minute) + 'm ';
	} else if (diff > day) {
		let days = Math.floor(diff / day);
		let hours = Math.floor((diff - days * day) / hour);
		let minutes = Math.floor((diff - days * day - hours * hour) / minute);
		return days + 'd ' + hours + 'h ' + minutes + 'm';
	}
}