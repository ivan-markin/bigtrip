import AbstractComponent from './AbstractComponent';

export const createDaysContainer = () => {
	return (
		`
			<ul class="trip-days"></ul>
		`
	)
}

export default class DaysContainer extends AbstractComponent {
	getTemplate() {
		return createDaysContainer();
	}
}