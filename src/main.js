import Menu from './components/Menu';
import Filters from './components/Filters';
import Sort from './components/Sort';
import EditPoint from './components/EditPointForm';
import NewPoint from './components/NewPointForm';
import TripPoint from './components/TripPoint';
import TripInfo from './components/TripInfo';
import TripCost from './components/TripCost';
import TripInfoContainer from './components/TripInfoContainer';
import DaysContainer from './components/DaysContainer';
import DayItemContainer from './components/DayItemContainer';
import DayInfo from './components/DayInfo';
import TripPointsContainer from './components/TripPointsContainer';
import Board from './components/Board';
import NoPoints from './components/NoPoints';
import { generateTripPoints } from './mocks/tripPoint';
import { generateFilters } from './mocks/filters';
import { generateSort } from './mocks/sort';
import { replace, render } from './utils/render';
import { generateDayInfo } from './mocks/dayInfo';

const tripMainContainer = document.querySelector('.trip-main');
const tripBoardContainer = document.querySelector('.board-container');
const controlEventsContainer = document.querySelector('.trip-main__trip-controls');

const POINTS_COUNT = 6;
const day = generateDayInfo();
const points = generateTripPoints(POINTS_COUNT);
const filters = generateFilters();
const sort = generateSort();
const boardComponent = new Board();

const renderPoint = (tripPointsContainer, point) => {
	const replacePointToEdit = () => {
		replace(tripPointsContainer, editFormComponent.getElement(), pointComponent.getElement());
	}

	const replaceEditToPoint = () => {
		replace(tripPointsContainer, pointComponent.getElement(), editFormComponent.getElement());
	}

	const onEscKeyDown = (evt) => {
		const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

		if (isEscKey) {
			replaceEditToPoint();
			document.removeEventListener('keydown', onEscKeyDown);
		}
	}

	const editFormComponent = new EditPoint(point);
	const editFormElement = editFormComponent.getElement().querySelector('.event--edit');
	const resetBtnElement = editFormComponent.getElement().querySelector('.event__reset-btn');
	const closeFormButton = editFormComponent.getElement().querySelector('.event__rollup-btn');
	editFormElement.addEventListener('submit', (evt) => {
		evt.preventDefault();
		replaceEditToPoint();
		document.removeEventListener('keydown', onEscKeyDown);
	})
	resetBtnElement.addEventListener('click', () => {
		replaceEditToPoint();
		document.removeEventListener('keydown', onEscKeyDown);
	})
	closeFormButton.addEventListener('click', () => {
		replaceEditToPoint();
		document.removeEventListener('keydown', onEscKeyDown);
	});

	const pointComponent = new TripPoint(point);
	const editButton = pointComponent.getElement().querySelector('.event__rollup-btn');
	editButton.addEventListener('click', () => {
		replacePointToEdit();
		document.addEventListener('keydown', onEscKeyDown);
	});

	render(tripPointsContainer, pointComponent)
}

const renderBoard = (boardComponent, points, dayData) => {
	if (!points.length) {
		render(boardComponent.getElement(), new NoPoints());
	} else {
		render(boardComponent.getElement(), new Sort(sort));

		render(boardComponent.getElement(), new DaysContainer());
		const daysList = boardComponent.getElement().querySelector('.trip-days');

		render(daysList, new DayItemContainer());
		const day = boardComponent.getElement().querySelector('.trip-days__item');

		render(day, new DayInfo(dayData));
		render(day, new TripPointsContainer());

		const tripPointsList = boardComponent.getElement().querySelector('.trip-events__list');

		points.forEach(point => {
			renderPoint(tripPointsList, point);
		})
	}
}

render(tripMainContainer, new TripInfoContainer(), 'afterbegin');

const infoSectionContainer = tripMainContainer.querySelector('.trip-main__trip-info');

render(infoSectionContainer, new TripInfo(points));
render(infoSectionContainer, new TripCost(points));
render(controlEventsContainer, new Menu(), 'afterbegin');
render(controlEventsContainer, new Filters(filters));
render(tripBoardContainer, boardComponent);
renderBoard(boardComponent, points, day);