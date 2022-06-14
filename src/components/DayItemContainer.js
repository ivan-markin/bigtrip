import AbstractComponent from './AbstractComponent';

export const createDayItemContainer = () => {
	return (
		`
			<li class="trip-days__item day"></li>
		`
	)
}

export default class DayItemContainer extends AbstractComponent {
	getTemplate() {
		return createDayItemContainer();
	}
}