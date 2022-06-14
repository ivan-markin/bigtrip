
export const render = (container, el, place = 'beforeend') => {
	switch (place) {
		case 'afterbegin':
			container.prepend(el);
			break;
		case 'beforeend':
			container.append(el);
			break;
	}
}