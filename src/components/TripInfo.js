import AbstractComponent from './AbstractComponent';

export const createTripInfoLayout = (points) => {
	const pointNames = points.map(point => point.city).join(' &mdash; ');

	return (
		`
			<div class="trip-info__main">
              <h1 class="trip-info__title"> ${pointNames} </h1>
              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
            </div>
		`
	)
}

export default class TripInfo extends AbstractComponent {
	constructor(points) {
		super();
		this._points = points;
	}

	getTemplate() {
		return createTripInfoLayout(this._points);
	}
}