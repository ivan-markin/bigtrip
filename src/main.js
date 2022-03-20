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

const tripMainContainer = document.querySelector('.trip-main');
const controlEventsContainer = document.querySelector('.trip-main__trip-controls');
const contentContainer = document.querySelector('.trip-events');

const POINTS_COUNT = 3;

const render = (container, layout, place = 'beforeend') => {
	container.insertAdjacentHTML(place, layout)
}

render(tripMainContainer, createTripInfoContainer(), 'afterbegin');

const infoSectionContainer = tripMainContainer.querySelector('.trip-main__trip-info');

render(infoSectionContainer, createTripInfoLayout());
render(infoSectionContainer, createTripCostLayout());
render(controlEventsContainer, createMenuLayout(), 'afterbegin');
render(controlEventsContainer, createFiltersLayout());
render(contentContainer, createSortLayout());
render(contentContainer, createEditFormLayout());
render(contentContainer, createTripListContainer());

const tripListContainer = contentContainer.querySelector('.trip-days');

render(tripListContainer, createDayItemContainer());

const dayItemContainer = contentContainer.querySelector('.trip-days__item');

render(dayItemContainer, createDayInfoLayout());
render(dayItemContainer, createTripPointsContainer());

const tripPointsContainer = contentContainer.querySelector('.trip-events__list');

for (let i = 1; i <= POINTS_COUNT; i++) {
	render(tripPointsContainer, createTripPointLayout());
}