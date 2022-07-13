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

export default class PointController {
	constructor(container, onDataChange) {
		this._container = container;
		this._pointComponent = null;
		this._editPointComponent = null;
		this._onEscKeyDown = this._onEscKeyDown.bind(this);
	}

	_onEscKeyDown(evt) {
		const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

		if (isEscKey) {
			replaceEditToPoint();
			document.removeEventListener('keydown', onEscKeyDown);
		}
	}

	render(point) {
		this._editPointComponent = new EditPoint(point);
		this._pointComponent = new TripPoint(point);

		const replacePointToEdit = () => {
			replace(this._editPointComponent, this._pointComponent);
		}

		const replaceEditToPoint = () => {
			replace(this._pointComponent, this._editPointComponent);
		}

		this._editPointComponent.setSubmitButtonClickHandler((evt) => {
			evt.preventDefault();
			replaceEditToPoint();
			document.removeEventListener('keydown', this._onEscKeyDown);
		})

		this._editPointComponent.setResetButtonClickHandler(() => {
			replaceEditToPoint();
			document.removeEventListener('keydown', this._onEscKeyDown);
		})

		this._editPointComponent.setCloseButtonClickHandler(() => {
			replaceEditToPoint();
			document.removeEventListener('keydown', this._onEscKeyDown);
		});

		this._pointComponent.setEditButtonClickHandler(() => {
			replacePointToEdit();
			document.addEventListener('keydown', this._onEscKeyDown);
		})

		this._editPointComponent.setFavoritesButtonClickHandler(() => {

		})

		render(this._container, this._pointComponent)
	}
}