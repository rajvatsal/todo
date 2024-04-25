const DefaultValues = (() => {
	const form = {
		attributes: {
			method: "post",
			action: "",
		},
	};

	return { form };
})();

export function createElement(tag, opts) {
	const element = document.createElement(tag);

	opts = DefaultValues[tag] ? Object.assign({}, DefaultValues[tag], opts) : opts;
	if (!(opts === undefined)) {
		for (let opt in opts.attributes) {
			element.setAttribute(opt, opts.attributes[opt]);
		}

		for (let opt in opts.property) {
			element[opt] = opts.property[opt];
		}
	}

	return element;
}
