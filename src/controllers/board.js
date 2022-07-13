import Sort, { SortType } from '../components/Sort';
import DaysContainer from '../components/DaysContainer';
import DayItemContainer from '../components/DayItemContainer';
import DayInfo from '../components/DayInfo';
import TripPointsContainer from '../components/TripPointsContainer';
import NoPoints from '../components/NoPoints';
import { replace, render } from '../utils/render';
import { POINTS_COUNT } from '../constants/constants';
import PointController from './point';

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

const renderPoints = (pointsListElement, points, onDataChange) => {
	return points.map(point => {
		const pointController = new PointController(pointsListElement, onDataChange);
		pointController.render(point);
		return pointController;
	})
}

export default class BoardController {
	constructor(container, dayData) {
		this._points = [];
		this._showedPointsControllers = [];
		this._container = container;
		this._noPointsComponent = new NoPoints();
		this._sortComponent = new Sort();
		this._daysContainer = new DaysContainer();
		this._dayItemContainer = new DayItemContainer();
		this._dayInfo = new DayInfo(dayData);
		this._tripPointsContainer = new TripPointsContainer();
		this._onSortTypeChange = this._onSortTypeChange.bind(this);
		this._onDataChange = this._onDataChange.bind(this);
	}

	render(points) {
		const container = this._container.getElement();

		this._points = points;

		if (!points.length) {
			render(container, this._noPointsComponent);
			return;
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

		const newPoints = renderPoints(tripPointsList, showingPointsOnStart, this._onDataChange);
		this._showedPointsControllers = this._showedPointsControllers.concat(newPoints);

		this._showedPointsControllers.forEach(point => {
			new PointController().render(point);
		})

		this._sortComponent.setSortTypeChangeHandler((sortType) => {
			const sortedPoints = getSortedPoints(points, sortType);

			tripPointsList.innerHTML = '';

			sortedPoints.forEach(point => {
				new PointController().render(point);
			})
		})
	}

	_onSortTypeChange() {

	}

	_onDataChange() {

	}
}