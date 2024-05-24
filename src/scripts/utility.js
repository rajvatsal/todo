const DefaultValues = (() => {
	const form = {
		attributes: {
			method: "post",
			action: "",
		},
	};

	return { form };
})();

const assignDefaultValues = function getAssigned(tag, opts) {
	for (const val in DefaultValues[tag]) {
		opts[val] = Object.assign({}, DefaultValues[tag][val], opts[val]);
	}
	return opts;
};

export function createElement(tag, opts) {
	const element = document.createElement(tag);

	opts = DefaultValues[tag]
		? // fix it not using assignDEfaultValues
			Object.assign({}, DefaultValues[tag], opts)
		: opts;
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

export const $ = (function () {
	const fn = (selector) => document.querySelector(selector);
	fn.all = (selector) => document.querySelectorAll(selector);
	return fn;
})();
