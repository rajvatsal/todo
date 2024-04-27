import { emit, on, off } from "./pub-sub";

const projects = [];

// [ INTERFACES ]
const inNOutInterface = (state) => ({
	type: "inNOutInterface",
	add: (options) => state.add(options, state),
	remove: (index) => state.remove(index, state),
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
			return opts;
		},
		remove: (tIndex, arg) => arg.tasks.splice(tIndex, 1),
		fetchAll: (arg) => arg.tasks.slice(),
	};

	const inNOut = inNOutInterface(proto);
	const fetchAll = fetchAllInterface(proto);
	const composite = Object.assign(inNOut, fetchAll);
	return Object.assign(Object.create(composite), options);
};

export const ProjectManager = ((options) => {
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

function addNewProject(opts) {
	ProjectManager.add(opts);
}

function addNewTask(data) {
	const [projectName, options] = data;
	for (let project of projects) {
		if (project.name === projectName) {
			project.taskManager.add(options);
			return;
		}
	}
	alert("error: project doesn't exist");
}

function openAProject(pName) {
	for (let project of projects) {
		if (project.name !== pName) continue;
		var tasks = project.taskManager.fetchAll(tasks);
		break;
	}
	emit("return__getProjectTasks", { tasks, pName });
}

function removeTask(data) {
	const { tIndex, pName } = data;
	for (let project of projects) {
		if (project.name !== pName) continue;
		project.taskManager.remove(tIndex);
		break;
	}
}

on("addNewProject", addNewProject);
on("addNewTask", addNewTask);
on("getProjectTasks", openAProject);
on("taskCompletedLogic", removeTask);
