import moment from 'moment';
import { dateConvert } from '../utils/dateConvert';
import AbstractComponent from './AbstractComponent';

export const createTripPointLayout = (point) => {
	const { type, city, dateFrom, dateTo, description, eventTypes, citiesList, offers, price } = point;

	const timeFrom = moment(dateFrom).format('HH:mm');
	const timeTo = moment(dateTo).format('HH:mm');
	const duration = dateConvert(dateTo - dateFrom);

	return (
		`
			<li class="trip-events__item">
				<div class="event">
				<div class="event__type">
					<img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
				</div>
				<h3 class="event__title">
					
					<span>${type}</span>
					
					${type === 'check-in' || type === 'sightseeing' || type === 'restaurant' ? 'in' : 'to'}

					${city}
					
				</h3>

				<div class="event__schedule">
					<p class="event__time">
					<time class="event__start-time" datetime="${dateFrom}">
						
						${timeFrom}

					</time>
					&mdash;
					<time class="event__end-time" datetime="${dateTo}">
						
						${timeTo}
						
					</time>
					</p>
					<p class="event__duration">
					
						${duration}

					</p>
				</div>

				<p class="event__price">
					&euro;<span class="event__price-value">
					
						${price}

					</span>
				</p>

				${offers.length ?

			`
						<h4 class="visually-hidden">Offers:</h4>
						<ul class="event__selected-offers">
							
							${offers.slice(0, 3).map((offer, i) => {

				return `<li class="event__offer">
														<span class="event__offer-title">

															${offers.slice(0, 3)[i].name}

														</span>
														&plus;
														&euro;<span class="event__offer-price">

															${offers.slice(0, 3)[i].price}

														</span>
													</li>`

			}).join('\n')}							
											</ul>
										`
			: ''
		}								
				<button class="event__rollup-btn" type="button">
					<span class="visually-hidden">Open event</span>
				</button>
				</div>
			</li>
		`
	)
}

export default class TripPoint extends AbstractComponent {
	constructor(point) {
		super();
		this._point = point;
	}

	getTemplate() {
		return createTripPointLayout(this._point);
	}

	setEditButtonClickHandler(handler) {
		const editButton = this.getElement().querySelector('.event__rollup-btn');
		editButton.addEventListener('click', handler);
	}
}