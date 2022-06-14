import moment from 'moment';
import AbstractComponent from './AbstractComponent';

const createEventTypeMarkup = (type) => {
	return `
		<div class="event__type-item">
			<input id="event-type-${type}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}">
			<label class="event__type-label event__type-label--${type}" for="event-type-${type}-1">${type}</label>
		</div>
	`
}

const createOfferLayout = (offer) => {
	const { id, name, price } = offer;

	return `
		<div class="event__offer-selector">
			<input class="event__offer-checkbox visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}">
			<label class="event__offer-label" for="event-offer-${id}-1">
				<span class="event__offer-title">${name}</span>
				&plus;
				&euro;&nbsp;<span class="event__offer-price">${price}</span>
			</label>
		</div>
	`
}

const createImageLayout = (src) => {
	return `
		<img class="event__photo" src="${src}" alt="Event photo">
	`
}

const createCitiesListLayout = (city) => {
	return `
		<option value="${city}"></option>
	`
}

export const createNewFormLayout = (point) => {
	const { type, city, dateFrom, dateTo, description, eventTypes, citiesList, offers } = point;

	const transferMarkup = eventTypes
		.filter((el, i) => i < 7)
		.map(type => createEventTypeMarkup(type))
		.join('\n');

	const activitiesMarkup = eventTypes
		.filter((el, i) => i > 6)
		.map(type => createEventTypeMarkup(type))
		.join('\n');

	const citiesMarkup = citiesList
		.map(city => createCitiesListLayout(city))
		.join('\n');

	const dayFrom = moment(dateFrom).format('L');
	const dayTo = moment(dateTo).format('L');
	const timeFrom = moment(dateFrom).format('HH:mm');
	const timeTo = moment(dateTo).format('HH:mm');
	const offersMarkup = offers
		.map(offer => createOfferLayout(offer))
		.join('\n');

	return (
		`
			<form class="trip-events__item  event event--edit" action="#" method="post">
				<header class="event__header">
				<div class="event__type-wrapper">
					<label class="event__type event__type-btn" for="event-type-toggle-1">
					<span class="visually-hidden">Choose event type</span>
					<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
					</label>
					<input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

					<div class="event__type-list">
					<fieldset class="event__type-group">
						<legend class="visually-hidden">Transfer</legend>

						${transferMarkup}					

					</fieldset>

					<fieldset class="event__type-group">
						<legend class="visually-hidden">Activity</legend>

						${activitiesMarkup}					
					
						</fieldset>
					</div>
				</div>

				<div class="event__field-group event__field-group--destination">
					<label class="event__label event__type-output" for="event-destination-1">
						<span>${type}</span>
						
						${type === 'check-in' || type === 'sightseeing' || type === 'restaurant' ? 'in' : 'to'}
						
					</label>
					<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
					<datalist id="destination-list-1">
						
						${citiesMarkup}

					</datalist>
				</div>

				<div class="event__field-group  event__field-group--time">
					<label class="visually-hidden" for="event-start-time-1">
					From
					</label>
					<input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayFrom} ${timeFrom}">
					&mdash;
					<label class="visually-hidden" for="event-end-time-1">
					To
					</label>
					<input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayTo} ${timeTo}">
				</div>

				<div class="event__field-group  event__field-group--price">
					<label class="event__label" for="event-price-1">
					<span class="visually-hidden">Price</span>
					&euro;
					</label>
					<input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
				</div>

				<button class="event__save-btn  btn btn--blue" type="submit">Save</button>
				<button class="event__reset-btn" type="reset">Cancel</button>
				</header>
				<section class="event__details">
				
				${offers.length ?
			`
						<section class="event__section  event__section--offers">
							<h3 class="event__section-title  event__section-title--offers">Offers</h3>

							<div class="event__available-offers">

								${offersMarkup}						
																	
							</div>
						</section>
					`
			: ''
		}								

				<section class="event__section  event__section--destination">
					<h3 class="event__section-title  event__section-title--destination">Destination</h3>
					<p class="event__destination-description">
						
						${description}
					
					</p>

					<div class="event__photos-container">
					<div class="event__photos-tape">
						
						${createImageLayout('http://picsum.photos/248/152?r=${Math.random()}')}
						${createImageLayout('http://picsum.photos/249/152?r=${Math.random()}')}
						${createImageLayout('http://picsum.photos/250/152?r=${Math.random()}')}
						${createImageLayout('http://picsum.photos/252/152?r=${Math.random()}')}
						${createImageLayout('http://picsum.photos/223/152?r=${Math.random()}')}

					</div>
					</div>
				</section>
				</section>
			</form>
		`
	)
}

export default class NewPoint extends AbstractComponent {
	constructor(point) {
		super();
		this._point = point;
	}

	getTemplate() {
		return createNewFormLayout(this._point);
	}
}