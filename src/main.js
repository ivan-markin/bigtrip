import { createMenuLayout } from './components/Menu';
import { createFiltersLayout } from './components/Filters';
import { createSortLayout } from './components/Sort';
import { createEditFormLayout } from './components/EditForm';
import { createTripPointLayout } from './components/TripPoint';
import { createTripInfoLayout } from './components/TripInfo';
import { createTripCostLayout } from './components/TripCost';
import { createTripInfoContainer } from './components/TripInfoContainer';
import { createTripListContainer } from './components/TripListContainer';
import { createDayItemContainer } from './components/DayItemContainer';
import { createDayInfoLayout } from './components/DayInfoLayout';
import { createTripPointsContainer } from './components/TripPointsContainer';
import { generateTripPoint, generateTripPoints } from './mocks/tripPoint';
import { generateFilters } from './mocks/filters';
import { generateSort } from './mocks/sort';

const tripMainContainer = document.querySelector('.trip-main');
const controlEventsContainer = document.querySelector('.trip-main__trip-controls');
const contentContainer = document.querySelector('.trip-events');

const POINTS_COUNT = 12;
const point = generateTripPoint();
const points = generateTripPoints(POINTS_COUNT);
const filters = generateFilters();
const sort = generateSort();

const render = (container, layout, place = 'beforeend') => {
	container.insertAdjacentHTML(place, layout)
}

render(tripMainContainer, createTripInfoContainer(), 'afterbegin');

const infoSectionContainer = tripMainContainer.querySelector('.trip-main__trip-info');

render(infoSectionContainer, createTripInfoLayout(points));
render(infoSectionContainer, createTripCostLayout(points));
render(controlEventsContainer, createMenuLayout(), 'afterbegin');
render(controlEventsContainer, createFiltersLayout(filters));
render(contentContainer, createSortLayout(sort));
render(contentContainer, createEditFormLayout(point));
render(contentContainer, createTripListContainer());

const tripListContainer = contentContainer.querySelector('.trip-days');

render(tripListContainer, createDayItemContainer());

const dayItemContainer = contentContainer.querySelector('.trip-days__item');

render(dayItemContainer, createDayInfoLayout());
render(dayItemContainer, createTripPointsContainer());

const tripPointsContainer = contentContainer.querySelector('.trip-events__list');

for (let i = 1; i <= POINTS_COUNT; i++) {
	render(tripPointsContainer, createTripPointLayout(points[i]), 'beforeend');
}