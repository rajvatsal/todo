import { compareAsc, format } from "date-fns";

const projects = [];

// [ INTERFACES ]
const inNOutInterface = (state) => ({
	type: "inNOutInterface",
	add: (options) => state.add(options, state),
	remove: (pattern) => state.remove(pattern, state),
});

const fetchInterface = (state) => ({
	fetch: () => state.fetch(state),
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
		fetch: (arg) => arg.tasks.slice(),
	};

	const inNOut = inNOutInterface(proto);
	const fetch = fetchInterface(proto);
	const composite = Object.assign(inNOut, fetch);
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
		fetch: () => projects.slice(),
	};

	const basic = inNOutInterface(proto);
	const fetch = fetchInterface(proto);
	const composite = Object.assign({}, basic, fetch);
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
console.log(projects[1].taskManager.fetch());
console.log(projects[0].taskManager.fetch());
