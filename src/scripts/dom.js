import { compareAsc, format } from "date-fns";
import { createElement } from "./utility";
import { on, off, emit } from "./pub-sub";

const btnAddProject = document.querySelector(".btn-add-project");
const dialogAddProject = document.querySelector("dialog.add-project");
const btnDialogAddProject = document.querySelector(".btn__form-add-project");
const formAddProject = document.querySelector("dialog.add-project > form");
const ipDialogProjectName = document.querySelector("#project-name");
const ipDilaogProjectColor = document.querySelector("#project-color");
const projectList = document.querySelector(".project-list");
const topHeading = document.querySelector("header>h1");
const taskForm = document.querySelector(".task-form");
const btnAddTask = document.querySelector(".btn_add-task");
const inputTaskName = document.querySelector("#task_name");
const inputTaskDate = document.querySelector("#due_date");
const inputTaskDesc = document.querySelector("#task_dec");
const inputTaskPriorities = Array.from(
	document.querySelectorAll('.task-form input[type="radio"]'),
);
const page = document.querySelector(".page");

const priorityManager = (() => {
	const priorityColors = {
		p1: "red",
		p2: "yellow",
		p3: "blue",
	};
	const prop = {
		getPriorityColor: (val) => priorityColors[val],
	};

	return Object.assign(Object.create(prop));
})();

const showProjectForm = () => dialogAddProject.showModal();
btnAddProject.addEventListener("click", showProjectForm);

btnDialogAddProject.addEventListener("click", clickHandlerAddProject);

btnAddTask.addEventListener("click", clickHandlerAddTask);

function clickHandlerAddTask(e) {
	if (!inputTaskName.checkValidity()) return;
	if (!inputTaskDate.checkValidity()) return;

	e.preventDefault();

	const projectNm = topHeading.textContent;
	const [priority] = inputTaskPriorities.filter((priority) => priority.checked);
	emit("addNewTask", [
		projectNm,
		{
			name: `${inputTaskName.value}`,
			dueDate: `${inputTaskDate.value}`,
			desc: `${inputTaskDesc.value}`,
			priority: priority.value,
		},
	]);
}

function clickHandlerAddProject(e) {
	if (!ipDialogProjectName.checkValidity()) return;
	e.preventDefault();

	const project = {};
	project.name = ipDialogProjectName.value;
	project.color = ipDilaogProjectColor.value;

	emit("addNewProject", project);
	dialogAddProject.close();
	formAddProject.reset();
}

function clickHandlerProjectBtn(e) {}

function showNewProject(project) {
	const li = createElement("li");
	const projectOptions = {
		property: { textContent: project.name },
		attributes: {
			style: `border: 1px solid ${project.color}`,
			class: "project-btn",
		},
	};
	const btnOpenProject = createElement("button", projectOptions);
	btnOpenProject.addEventListener("click", (e) =>
		emit("getProjectTasks", e.target.textContent),
	);
	li.appendChild(btnOpenProject);
	projectList.appendChild(li);
}

function showNewTask(newTask) {
	const taskList = document.querySelector(".task-list");
	const li = createElement("li");
	const checkBox = createElement("input", {
		attributes: {
			type: "radio",
			name: `${newTask.name}`,
			value: newTask.name,
		},
	});

	checkBox.addEventListener("click", clickHandlerTaskCheckbox);

	const taskInfoContainer = createElement("div", {
		attributes: { class: "task-info" },
	});

	li.setAttribute(
		"style",
		`border: 1px solid ${priorityManager.getPriorityColor(newTask.priority)}`,
	);
	const div = createElement("div", { attributes: { class: "task-container" } });
	const h3 = createElement("h3", {
		property: { textContent: `${newTask.name}` },
	});
	let p;
	if (newTask.desc)
		p = createElement("p", { property: { textContent: `${newTask.desc}` } });
	const span = createElement("span", {
		attributes: { class: "due-date" },
		property: { textContent: `${newTask.dueDate}` },
	});
	taskInfoContainer.appendChild(h3);
	if (p !== undefined) taskInfoContainer.appendChild(p);
	taskInfoContainer.appendChild(span);
	div.appendChild(checkBox);
	div.appendChild(taskInfoContainer);
	li.appendChild(div);
	taskList.appendChild(li);
}

function showProjectTasks({ tasks, pName }) {
	const taskList = document.querySelector(".task-list");
	page.removeChild(taskList);
	page.prepend(createElement("ul", { attributes: { class: "task-list" } }));
	tasks.forEach((task) => showNewTask(task));
	topHeading.textContent = pName;
	taskForm.style.display = "block";
}

function clickHandlerTaskCheckbox(e) {
	const tName = e.target.value;
	const pName = topHeading.textContent;
	emit("taskCompletedLogic", { tName, pName });
}

on("showNewProject", showNewProject);
on("showNewTask", showNewTask);
on("showCurrentProjectTasks", showProjectTasks);
