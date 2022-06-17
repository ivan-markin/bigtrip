import Menu from './components/Menu';
import Filters from './components/Filters';
import TripInfo from './components/TripInfo';
import TripCost from './components/TripCost';
import TripInfoContainer from './components/TripInfoContainer';
import Board from './components/Board';
import BoardController from './controllers/board';
import { generateTripPoints } from './mocks/tripPoint';
import { generateFilters } from './mocks/filters';
import { render } from './utils/render';
import { generateDayInfo } from './mocks/dayInfo';
import { generateSort } from './mocks/sort';
import { POINTS_COUNT } from './constants/constants';

const tripMainContainer = document.querySelector('.trip-main');
const tripBoardContainer = document.querySelector('.board-container');
const controlEventsContainer = document.querySelector('.trip-main__trip-controls');

const day = generateDayInfo();
const points = generateTripPoints(POINTS_COUNT);
const filters = generateFilters();
const boardComponent = new Board();

render(tripMainContainer, new TripInfoContainer(), 'afterbegin');

const infoSectionContainer = tripMainContainer.querySelector('.trip-main__trip-info');

render(infoSectionContainer, new TripInfo(points));
render(infoSectionContainer, new TripCost(points));
render(controlEventsContainer, new Menu(), 'afterbegin');
render(controlEventsContainer, new Filters(filters));
render(tripBoardContainer, boardComponent);

const boardController = new BoardController(boardComponent, day);

boardController.render(points);