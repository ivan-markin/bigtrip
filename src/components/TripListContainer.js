import AbstractComponent from './AbstractComponent';

export const createTripListContainer = () => {
	return (
		`
			<ul class="trip-days"></ul>
		`
	)
}

export default class TripListContainer extends AbstractComponent {
	getTemplate() {
		return createTripListContainer();
	}
}