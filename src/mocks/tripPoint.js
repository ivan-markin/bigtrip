const eventTypes = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const cities = ['Arkhangelsk', 'Vladivistok', 'Moscow', 'Lissabon', 'Barselona', 'Istanbul'];
const defaultText = `
	Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam
	id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
	Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam
	faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed
	felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.
`;

const offersList = [
	{
		type: 'flight',
		name: 'Choose meal',
		id: 'meal',
		price: 99
	},
	{
		type: 'flight',
		name: 'Upgrade to comfort class',
		id: 'comfort',
		price: 199
	},
	{
		type: 'flight',
		name: 'Add luggage',
		id: 'luggage',
		price: 59
	},
	{
		type: 'flight',
		name: 'Choose seats',
		id: 'seats',
		price: 299
	},
	{
		type: 'flight',
		name: 'Travel by train',
		id: 'train',
		price: 89
	}
];

// const generateOffer = () => {
// 	const { name, id } = offersList[Math.floor(Math.random() * offersList.length)];

// 	return {
// 		type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
// 		id: id,
// 		name: name,
// 		price: Math.floor(Math.random() + 10)
// 	}
// }

export const generateTripPoint = () => {
	return {
		type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
		city: cities[Math.floor(Math.random() * cities.length)],
		dateFrom: Date.parse('2022-05-07T12:32:00'),
		dateTo: Date.now(),
		description: defaultText.split('. ')
			.slice(0, Math.floor((Math.random() + 1) * 4))
			.join('. ') + '.',
		eventTypes: eventTypes,
		citiesList: cities,
		offers: offersList.slice(0, Math.floor(Math.random() * 5)),
		price: Math.floor(Math.random() * 100),
	}
}

export const generateTripPoints = (count) => {
	return new Array(count)
		.fill('')
		.map(generateTripPoint);
}