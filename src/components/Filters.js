import AbstractComponent from './AbstractComponent';

const createFilterMarkup = (name, isChecked) => {
	return `
		<div class="trip-filters__filter">
			<input id="filter-${name}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? 'checked' : ''}>
			<label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
		</div>
	`
}

export const createFiltersLayout = (filters) => {
	const filtersMarkup = filters.map((name, i) => createFilterMarkup(name, i === 0)).join('\n');

	return (
		`
			<form class="trip-filters" action="#" method="get">
				
				${filtersMarkup}

				<button class="visually-hidden" type="submit">Accept filter</button>
            </form>
		`
	)
}

export default class Filters extends AbstractComponent {
	constructor(filters) {
		super();
		this._filters = filters;
	}

	getTemplate() {
		return createFiltersLayout(this._filters);
	}
}