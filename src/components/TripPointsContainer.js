import AbstractComponent from './AbstractComponent';

export const createTripPointsContainer = () => {
	return (
		`
			<ul class="trip-events__list"></ul>
		`
	)
}

export default class TripPointsContainer extends AbstractComponent {
	getTemplate() {
		return createTripPointsContainer();
	}
}