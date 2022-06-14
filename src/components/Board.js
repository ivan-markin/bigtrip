import AbstractComponent from './AbstractComponent';

export const createBoardTemplate = () => {
	return (
		`
			<section class="trip-events"></section>
		`
	)
}

export default class Board extends AbstractComponent {
	getTemplate() {
		return createBoardTemplate();
	}
}