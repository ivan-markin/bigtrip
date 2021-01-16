import { createRouteInfoTemplate } from './components/routeInfoTemplate';
import { createMenuTemplate } from './components/menuTemplate';
import { createFiltersTemplate } from './components/filtersTemplate';
import { createSortTemplate } from './components/sortTemplate';
import { createEventEditFormTemplate } from './components/eventEditFormTemplate';
import { createTripDaysListTemplate } from './components/tripDaysListTemplate';
import { createTripDayTemplate } from './components/tripDayTemplate';
import { createDayInfoTemplate } from './components/dayInfoTemplate';
import { createTripEventsListTemplate } from './components/tripEventsListTemplate';
import { createEventItemTemplate } from './components/eventItemTemplate';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsContainerElement = tripMainElement.querySelector('.trip-main__trip-controls');
const pageMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const EVENTS_COUNT = 3;

const render = (container, template, position = 'beforeend') => {
    container.insertAdjacentHTML(position, template)
}

render(tripMainElement, createRouteInfoTemplate(), 'afterbegin');
render(tripControlsContainerElement, createMenuTemplate());
render(tripControlsContainerElement, createFiltersTemplate());
render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createEventEditFormTemplate());
render(tripEventsElement, createTripDaysListTemplate());

const tripDaysListElement = tripEventsElement.querySelector('.trip-days');

render(tripDaysListElement, createTripDayTemplate());

const tripDayElement = tripDaysListElement.querySelector('.trip-days__item');

render(tripDayElement, createDayInfoTemplate());
render(tripDayElement, createTripEventsListTemplate());

const tripEventsListElement = tripDayElement.querySelector('.trip-events__list');

for (let i = 1; i <= EVENTS_COUNT; i++) {
    render(tripEventsListElement, createEventItemTemplate());
}
