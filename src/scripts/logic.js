const projects = [];

// [ INTERFACES ]
const inNOutInterface = (state) => ({
	type: "inNOutInterface",
	add: (options) => state.add(options, state),
	remove: (pattern) => state.remove(pattern, state),
});

const fetchAllInterface = (state) => ({
	fetchAll: () => state.fetchAll(state),
});

const fetchOneInterface = (state) => ({
	fetch: (pattern) => state.fetch(pattern, state),
});

// [ FACTORIES ]
const TaskManager = (options) => {
	const proto = {
		tasks: [],
		add: (opts, arg) => {
			arg.tasks.push(opts);
		},
		remove: (ptn, arg) => {
			for (let i = 0; i < arg.tasks.length; i++) {
				if (arg.tasks[i].name === ptn) arg.tasks.splice(i, 1);
			}
		},
		fetchAll: (arg) => arg.tasks.slice(),
	};

	const inNOut = inNOutInterface(proto);
	const fetchAll = fetchAllInterface(proto);
	const composite = Object.assign(inNOut, fetchAll);
	return Object.assign(Object.create(composite), options);
};

export const projectManager = ((options) => {
	const proto = {
		add: (opts) => {
			opts.taskManager = TaskManager();
			projects.push(opts);
			return opts;
		},
		remove: (ptn) => {
			for (let i = 0; i < projects.length; i++) {
				if (ptn === projects[i].name) projects.splice(i, 1);
			}
		},
		fetchAll: () => projects.slice(),
		fetch: (ptn) => {
			for (let i = 0; i < projects.length; i++) {
				if (ptn === projects[i].name) return projects[i];
			}
		},
	};

	const basic = inNOutInterface(proto);
	const fetchAll = fetchAllInterface(proto);
	const fetchOne = fetchOneInterface(proto);
	const composite = Object.assign(basic, fetchAll, fetchOne);
	return Object.assign(Object.create(composite), options);
})();
