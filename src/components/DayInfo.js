import moment from 'moment';
import AbstractComponent from './AbstractComponent';

const createDayInfoLayout = (dayInfo) => {
	const { dayCount, date } = dayInfo;

	const currentDate = moment(date).format('MMM D');

	return (
		`
			<div class="day__info">
                <span class="day__counter">${dayCount}</span>
                <time class="day__date" datetime="2019-03-18">${currentDate}</time>
            </div>
		`
	)
}

export default class DayInfo extends AbstractComponent {
	constructor(day) {
		super();
		this._day = day;
	}

	getTemplate() {
		return createDayInfoLayout(this._day);
	}
}