import { emit, on, off } from "./pub-sub";

const projects = [{ name: "sicko" }];

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

const modifyInterface = (state) => ({
	type: "modifyInterface",
	modify: (taskIndex, opts) => state.modify(taskIndex, opts, state),
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
		modify: (tIndex, opts, arg) => Object.assign(arg.tasks[tIndex], opts),
	};

	const inNOut = inNOutInterface(proto);
	const fetchAll = fetchAllInterface(proto);
	const modify = modifyInterface(proto);
	const composite = Object.assign(inNOut, fetchAll, modify);
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
		fetch: (ptn) => getProject(ptn),
	};

	const basic = inNOutInterface(proto);
	const fetchAll = fetchAllInterface(proto);
	const fetchOne = fetchOneInterface(proto);
	const composite = Object.assign(basic, fetchAll, fetchOne);
	return Object.assign(Object.create(composite), options);
})();

// functions
function addNewProject(opts) {
	ProjectManager.add(opts);
}

function getProject(pName) {
	for (let project of projects) {
		if (pName === project.name) return project;
	}
}

function addNewTask(data) {
	const [projectName, options] = data;
	const project = getProject(projectName);
	if (project !== undefined) project.taskManager.add(options);
	else alert("error: project doesn't exist");
}

function openAProject(pName) {
	let tasks = getProject(pName).taskManager.fetchAll();
	emit("return__getProjectTasks", { tasks, pName });
}

function removeTask(data) {
	const { tIndex, pName } = data;
	getProject(pName).taskManager.remove(tIndex);
}

function updateTask({ pName, tIndex, opts }) {
	getProject(pName).taskManager.modify(tIndex, opts);
}

function returnProjectList() {
	const pList = ProjectManager.fetchAll();
	emit("return__getProjectList", pList);
}

on("addNewProject", addNewProject);
on("addNewTask", addNewTask);
on("getProjectTasks", openAProject);
on("taskCompletedLogic", removeTask);
on("editTask", updateTask);
on("getProjectList", returnProjectList);
emit("return__getProjectList", ProjectManager.fetchAll()); // list default projects
