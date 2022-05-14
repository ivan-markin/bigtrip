export const createTripCostLayout = (points) => {
	const tripCost = points
		.map(el => el.price)
		.reduce((previousValue, currentValue) => previousValue + currentValue);

	return (
		`
			<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
            </p>
		`
	)
}