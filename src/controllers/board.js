import Sort, { SortType } from '../components/Sort';
import EditPoint from '../components/EditPointForm';
import NewPoint from '../components/NewPointForm';
import TripPoint from '../components/TripPoint';
import DaysContainer from '../components/DaysContainer';
import DayItemContainer from '../components/DayItemContainer';
import DayInfo from '../components/DayInfo';
import TripPointsContainer from '../components/TripPointsContainer';
import NoPoints from '../components/NoPoints';
import { replace, render } from '../utils/render';
import { POINTS_COUNT } from '../constants/constants';

const getSortedPoints = (points, sortType) => {
	let sortedPoints = [];
	const showingPoints = points.slice();

	switch (sortType) {
		case SortType.EVENT:
			sortedPoints = showingPoints.sort((a, b) => a.type - b.type);
			break
		case SortType.TIME:
			sortedPoints = showingPoints.sort((a, b) => a.dateFrom - b.dateFrom);
			break
		case SortType.PRICE:
			sortedPoints = showingPoints.sort((a, b) => a.price - b.price);
			break
	}

	return sortedPoints;
}

const renderPoint = (tripPointsContainer, point) => {
	const editFormComponent = new EditPoint(point);
	const pointComponent = new TripPoint(point);

	const replacePointToEdit = () => {
		replace(editFormComponent, pointComponent);
	}

	const replaceEditToPoint = () => {
		replace(pointComponent, editFormComponent);
	}

	const onEscKeyDown = (evt) => {
		const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

		if (isEscKey) {
			replaceEditToPoint();
			document.removeEventListener('keydown', onEscKeyDown);
		}
	}

	editFormComponent.setSubmitButtonClickHandler((evt) => {
		evt.preventDefault();
		replaceEditToPoint();
		document.removeEventListener('keydown', onEscKeyDown);
	})

	editFormComponent.setResetButtonClickHandler(() => {
		replaceEditToPoint();
		document.removeEventListener('keydown', onEscKeyDown);
	})

	editFormComponent.setCloseButtonClickHandler(() => {
		replaceEditToPoint();
		document.removeEventListener('keydown', onEscKeyDown);
	});

	pointComponent.setEditButtonClickHandler(() => {
		replacePointToEdit();
		document.addEventListener('keydown', onEscKeyDown);
	})

	render(tripPointsContainer, pointComponent)
}

export default class BoardController {
	constructor(container, dayData) {
		this._container = container;
		this._noPointsComponent = new NoPoints();
		this._sortComponent = new Sort();
		this._daysContainer = new DaysContainer();
		this._dayItemContainer = new DayItemContainer();
		this._dayInfo = new DayInfo(dayData);
		this._tripPointsContainer = new TripPointsContainer();
	}

	render(points) {
		const container = this._container.getElement();

		if (!points.length) {
			render(container, this._noPointsComponent);
			return
		}

		render(container, this._sortComponent);

		render(container, this._daysContainer);
		const daysList = container.querySelector('.trip-days');

		render(daysList, this._dayItemContainer);
		const day = container.querySelector('.trip-days__item');

		render(day, this._dayInfo);
		render(day, this._tripPointsContainer);

		const tripPointsList = container.querySelector('.trip-events__list');
		const showingPointsOnStart = points.slice().sort((a, b) => a.event - b.event);

		showingPointsOnStart.forEach(point => {
			renderPoint(tripPointsList, point);
		})

		this._sortComponent.setSortTypeChangeHandler((sortType) => {
			const sortedPoints = getSortedPoints(points, sortType);

			tripPointsList.innerHTML = '';

			sortedPoints.forEach(point => {
				renderPoint(tripPointsList, point);
			})
		})
	}
}