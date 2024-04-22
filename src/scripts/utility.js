export function createElement(tag, opts) {
	const element = document.createElement(tag);
	for (let opt in opts) {
		element.setAttribute(opt, opts[opt]);
	}
}
