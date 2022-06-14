import AbstractComponent from './AbstractComponent';

const createTripInfoContainer = () => {
	return (
		`
			<section class="trip-main__trip-info trip-info"></section>
		`
	)
}

export default class TripInfoContainer extends AbstractComponent {
	getTemplate() {
		return createTripInfoContainer();
	}
}