import { emit, off, on } from "./pub-sub";

let projects = [];
let openedProject = "";

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
	for (const project of projects) {
		if (pName === project.name) return project;
	}
}

function addNewTask(opts) {
	const project = getProject(openedProject);
	const projectExists = project !== undefined;
	if (projectExists) project.taskManager.add(opts);
	updateLocalStorage();
	return projectExists;
}

function openProject(pName) {
	openedProject = pName;
	const tasks = getProject(openedProject).taskManager.fetchAll();
	emit("openedProject", { tasks, pName });
}

function removeTask(tIndex) {
	getProject(openedProject).taskManager.remove(tIndex);
	updateLocalStorage();
}

function updateTask({ tIndex, opts }) {
	getProject(openedProject).taskManager.modify(tIndex, opts);
	updateLocalStorage();
}

function openProjectList() {
	openedProject = "";
	emit("openedMyProjects", ProjectManager.fetchAll());
}

export function isValidProject(pName) {
	for (const project of projects) {
		if (project.name === pName) return false;
	}
	return true;
}

export function init() {
	const localSaves = localStorage.getItem("todolist");

	if (localSaves) {
		setTodolist();
	} else {
		populateStorage();
	}

	function setTodolist() {
		const todolist = JSON.parse(localSaves);

		// Add protoype methods like add, fetch etc
		// biome-ignore lint/complexity/noForEach: <explanation>
		todolist.forEach((project) => {
			const tasks = project.taskManager.tasks;
			project.taskManager = TaskManager({}, tasks);
		});

		projects = todolist;
	}

	emit("renderApp", ProjectManager.fetchAll()); // list default projects
}

function populateStorage() {
	ProjectManager.add({ name: "Hope you like it", color: "red" });
	localStorage.setItem("todolist", JSON.stringify(projects));
}

function updateLocalStorage() {
	localStorage.setItem("todolist", JSON.stringify(projects));
}

function modifyProject({ oldName, name, color }) {
	ProjectManager.modify(getProject(oldName), { name, color });
	updateLocalStorage();
}

function addNewProject(opts) {
	ProjectManager.add(opts);
	updateLocalStorage();
}

function removeProject(ptn) {
	ProjectManager.remove(ptn);
	updateLocalStorage();
	if (ptn === openedProject) emit("openMyProjects");
}

on("projectAdded", addNewProject);
on("addNewTask", addNewTask, "addNewTask");
on("openProject", openProject);
on("taskCompletedLogic", removeTask);
on("editTask", updateTask);
on("openMyProjects", openProjectList);
on("projectRemoved", removeProject);
on("removeTask", removeTask);
on("projectEdited", modifyProject);
