import AbstractComponent from './AbstractComponent';

export const createTripCostLayout = (points) => {
	let tripCost = 0;

	if (points.length) {
		tripCost = points
			.map(el => el.price)
			.reduce((previousValue, currentValue) => previousValue + currentValue);
	}

	return (
		`
			<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
            </p>
		`
	)
}

export default class TripCost extends AbstractComponent {
	constructor(points) {
		super();
		this._points = points;
	}

	getTemplate() {
		return createTripCostLayout(this._points);
	}
}