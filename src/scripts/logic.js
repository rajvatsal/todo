import { emit, on, off } from "./pub-sub";

let projects = [];

// [ INTERFACES ]
const inNOutInterface = (state) => ({
	type: "inNOutInterface",
	add(options) {
		state.add(options, this);
	},
	remove(index) {
		state.remove(index, this);
	},
});

const fetchAllInterface = (state) => ({
	type: "fetchAllInterface",
	fetchAll() {
		return state.fetchAll(this);
	},
});

const fetchOneInterface = (state) => ({
	type: "fetchOneInterface",
	fetch(pattern) {
		return state.fetch(pattern, this);
	},
});

const modifyInterface = (state) => ({
	type: "modifyInterface",
	modify(object, opts) {
		return state.modify(object, opts, this);
	},
});

// [ FACTORIES ]
const TaskManager = (options, tasks = []) => {
	const proto = {
		add: (opts, parent) => {
			parent.tasks.push(opts);
			return opts;
		},
		remove: (tIndex, parent) => parent.tasks.splice(tIndex, 1),
		fetchAll: (parent) => parent.tasks.slice(),
		modify: (tIndex, opts, parent) => Object.assign(parent.tasks[tIndex], opts),
	};

	const inNOut = inNOutInterface(proto);
	const fetchAll = fetchAllInterface(proto);
	const modify = modifyInterface(proto);
	const composite = Object.assign(inNOut, fetchAll, modify);
	return Object.assign(Object.create(composite), options, { tasks });
};

const ProjectManager = ((options) => {
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
		modify: (project, opts) => Object.assign(project, opts),
	};

	const basic = inNOutInterface(proto);
	const fetchAll = fetchAllInterface(proto);
	const fetchOne = fetchOneInterface(proto);
	const modify = modifyInterface(proto);
	const composite = Object.assign({}, basic, fetchAll, fetchOne, modify);
	return Object.assign(Object.create(composite), options);
})();

// functions
function getProject(pName) {
	for (let project of projects) {
		if (pName === project.name) return project;
	}
}

function addNewTask(data) {
	const [projectName, opts] = data;
	const project = getProject(projectName);
	const projectExists = project === undefined ? false : true;
	if (projectExists) project.taskManager.add(opts);
	updateLocalStorage();
	return projectExists;
}

function openAProject(pName) {
	let tasks = getProject(pName).taskManager.fetchAll();
	emit("return__getProjectTasks", { tasks, pName });
}

function removeTask(data) {
	const { tIndex, pName } = data;
	getProject(pName).taskManager.remove(tIndex);
	updateLocalStorage();
}

function updateTask({ pName, tIndex, opts }) {
	getProject(pName).taskManager.modify(tIndex, opts);
	updateLocalStorage();
}

function returnProjectList() {
	const pList = ProjectManager.fetchAll();
	emit("return__getProjectList", pList);
}

export function isValidProject(pName) {
	for (let project of projects) {
		if (project.name === pName) return false;
	}
	return true;
}

export function init() {
	emit("initApp", ProjectManager.fetchAll()); // list default projects
}

function modifyProject({ oldName, name, color }) {
	ProjectManager.modify(getProject(oldName), { name, color });
	updateLocalStorage();
}

const localSaves = localStorage.getItem("todolist");

if (localSaves) {
	setTodolist();
} else {
	populateStorage();
}

function setTodolist() {
	const todolist = JSON.parse(localSaves);

	// Add protoype methods like add, fetch etc
	todolist.forEach((project) => {
		const tasks = project.taskManager.tasks;
		project.taskManager = TaskManager({}, tasks);
	});

	projects = todolist;
}

function populateStorage() {
	ProjectManager.add({ name: "sicko", color: "red" });
	ProjectManager.add({ name: "joker", color: "blue" });
	localStorage.setItem("todolist", JSON.stringify(projects));
}

function updateLocalStorage() {
	localStorage.setItem("todolist", JSON.stringify(projects));
}

function addNewProject(opts) {
	ProjectManager.add(opts);
	updateLocalStorage();
}

function removeProject(ptn) {
	ProjectManager.remove(ptn);
	updateLocalStorage();
}

on("addNewProject", addNewProject);
on("addNewTask", addNewTask);
on("getProjectTasks", openAProject);
on("taskCompletedLogic", removeTask);
on("editTask", updateTask);
on("getProjectList", returnProjectList);
on("removeProject", removeProject);
on("removeTask", removeTask);
on("editProject", modifyProject);
