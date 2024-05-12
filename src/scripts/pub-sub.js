const eventsDefined = {};

export const on = (eventName, fn) => {
	//subscriber function
	eventsDefined[eventName] = eventsDefined[eventName] || [];
	eventsDefined[eventName].push(fn);
};

export const off = (eventName, fn) => {
	//remover function
	if (eventsDefined[eventName]) {
		for (var i = 0; i < eventsDefined[eventName].length; i++) {
			if (eventsDefined[eventName][i] === fn) {
				eventsDefined[eventName].splice(i, 1);
				break;
			}
		}
	}
};

export const emit = (eventName, data, fnName) => {
	//publish function
	let returnValue = null;
	if (eventsDefined[eventName]) {
		eventsDefined[eventName].forEach(function (fn) {
			if (fn.name === fnName) returnValue = fn(data);
			else fn(data);
		});
	}
	return returnValue;
};
