import { compareAsc, format } from "date-fns";

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

// [ FACTORIES ]
const TaskManager = (options) => {
	const proto = {
		tasks: [],
		add: (opts, arg) => {
			opts.selfIndex = arg.tasks.length;
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
			opts.selfIndex = projects.length;
			opts.taskManager = TaskManager();
			projects.push(opts);
		},
		remove: (ptn) => {
			for (let i = 0; i < projects.length; i++) {
				if (ptn === projects[i].name) projects.splice(i, 1);
			}
		},
		fetchAll: () => projects.slice(),
	};

	const basic = inNOutInterface(proto);
	const fetchAll = fetchAllInterface(proto);
	const composite = Object.assign(basic, fetchAll);
	return Object.assign(Object.create(composite), options);
})();

projectManager.add({ name: "vatsal", color: "charcoal" });
projectManager.add({ name: "anhay", color: "red" });
projects[0].taskManager.add({
	name: "Todo list",
	desc: "Write the logic for todo list",
	priority: "high",
});
projects[1].taskManager.add({ name: "Shananigans", desc: "jindagi jhand hai" });
console.log(projects);
console.log(projects[1].taskManager.fetchAll());
console.log(projects[0].taskManager.fetchAll());
