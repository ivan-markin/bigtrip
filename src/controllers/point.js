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

export default class PointController {
	constructor(container) {
		this._container = container;
		this._pointComponent = null;
		this._editPointComponent = null;
		this._onEscKeyDown = this._onEscKeyDown.bind(this);
	}

	render(point) {
		this._editPointComponent = new EditPoint(point);
		this._pointComponent = new TripPoint(point);

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
}