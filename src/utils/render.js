export const createElement = (template) => {
	const container = document.createElement('div');
	container.innerHTML = template;
	return container.firstElementChild;
}

export const render = (container, component, place = 'beforeend') => {
	switch (place) {
		case 'afterbegin':
			container.prepend(component.getElement());
			break;
		case 'beforeend':
			container.append(component.getElement());
			break;
	}
}

export const replace = (parent, newElement, oldElement) => {
	parent.replaceChild(newElement, oldElement);
}