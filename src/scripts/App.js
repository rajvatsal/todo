import { compareAsc, format, intlFormat, weeksToDays } from "date-fns";

import Header from "./Header.js";
import Sidebar from "./Sidebar";
import AddProject from "./AddProjectDialog.js";
import EditProject from "./FormEditProject.js";
import { emit, off, on } from "./pub-sub";
import { $, createElement } from "./utility";
import { isValidProject } from "./logic";

const taskForm = $(".task-form");
const btnAddTask = $(".page__btn-add-task");
const inputTaskName = $("#task_name");
const inputTaskDate = $("#due_date");
const inputTaskDesc = $("#task_dec");
const page = $(".page");
const btnAddTaskSubmitForm = $(".task-form__btn-add-task");
const btnTaskCancel = $(".task-form__btn-cancel");
const projectsNavPrimary = $(".page__projects-nav-primary");

const tPriorityAttritubte = "data-priority";

function getTaskIndex(task) {
	const tasks = document.querySelectorAll(".page .task-list>li");
	for (let i = 0; i < tasks.length; i++) {
		if (task === tasks[i]) return i;
	}
}

function clickHandlerShowTaskForm(e) {
	taskForm.style.display = "block";
	e.target.style.display = "none";
}

function clickHandlerCancelTask() {
	taskForm.style.display = "none";
	btnAddTask.style.display = "block";
}

btnAddTask.addEventListener("click", clickHandlerShowTaskForm);
btnTaskCancel.addEventListener("click", clickHandlerCancelTask);

function createTaskInfo(newTask) {
	const infoContainer = createElement("div", {
		attributes: { class: "task-info" },
	});
	const h3 = createElement("h3", {
		property: { textContent: `${newTask.name}` },
		attributes: { class: "name" },
	});
	const p = newTask.desc
		? createElement("p", {
				attributes: { class: "desc" },
				property: { textContent: `${newTask.desc}` },
			})
		: undefined;

	const span = createElement("span", {
		attributes: { class: "due-date" },
		property: { textContent: `${newTask.dueDate}` },
	});

	infoContainer.append(h3, p, span);
	return infoContainer;
}

btnAddTaskSubmitForm.addEventListener("click", clickHandlerTaskFormSubmit);

// Only adds project to the project list doesn't change the page. Give a more appropriate name.

function clickHandlerTaskFormSubmit(e) {
	if (!inputTaskName.checkValidity()) return;
	if (!inputTaskDate.checkValidity()) return;

	e.preventDefault();

	const priority = $(
		'.page .task-form input[type="radio"]:not(:disabled):checked',
	);

	const taskOpts = {
		name: `${inputTaskName.value}`,
		dueDate: `${inputTaskDate.value}`,
		desc: `${inputTaskDesc.value}`,
		priority: priority.value,
	};

	const isTaskAdded = emit("addNewTask", taskOpts, "addNewTask");
	if (isTaskAdded) showNewTask(taskOpts);
	else alert("project doesn't exist");
}

function showNewTask(newTask) {
	console.log(typeof newTask);
	const taskList = $(".task-list");
	const li = createElement("li");

	li.addEventListener("click", clickHandlerDelegateTaskBtn);

	const checkBox = createElement("input", {
		attributes: {
			type: "radio",
			name: `${newTask.name}`,
			value: newTask.name,
		},
	});

	checkBox.addEventListener("click", clickHandlerTaskCheckbox);

	const taskInfoContainer = createTaskInfo(newTask);

	const taskContainer = createElement("div", {
		attributes: {
			class: "task-container",
			[tPriorityAttritubte]: newTask.priority,
		},
	});

	const editBtn = createElement("button", {
		attributes: {
			class: "btn-edit-task",
		},
		property: { textContent: "edit" },
	});

	const deleteBtn = createElement("button", {
		attributes: {
			class: "btn-remove-task",
		},
		property: {
			textContent: "remove",
		},
	});

	taskContainer.append(checkBox, taskInfoContainer, editBtn, deleteBtn);
	li.appendChild(taskContainer);
	taskList.appendChild(li);
}

function removeTaskBtn() {
	//this is the list element
	emit("removeTask", [...this.parentNode.children].indexOf(this));
	this.remove();
}

function editTask() {
	// custom function to select children of this task
	const select = this.querySelector.bind(this);

	const tName = select(".task-info .name").textContent;
	let tDesc = select(".task-info .desc");
	tDesc = tDesc === null ? "" : tDesc.textContent;
	const tDate = select(".task-info .due-date").textContent;
	const tPriority = select(".task-container")
		.getAttribute(tPriorityAttritubte)
		.split("")[1];

	const formContainer = createElement("div", {
		attributes: { class: "task-edit-form-container" },
	});
	const form = createElement("form");
	const fieldset = createElement("fieldset");
	const legend = createElement("legend", { property: { textContent: "edit" } });
	const name = createElement("input", {
		attributes: {
			type: `text`,
			id: "edit_tName",
			name: "task_name",
			placeholder: "task name",
			value: `${tName}`,
			required: null,
		},
	});
	const labelNm = createElement("label", {
		attributes: {
			for: `edit_tName`,
		},
		property: {
			textContent: "name",
		},
	});

	const desc = createElement("input", {
		attributes: {
			type: `textarea`,
			id: "edit_tDesc",
			name: "task_desc",
			placeholder: "description",
			value: `${tDesc}`,
		},
	});
	const labelDesc = createElement("label", {
		attributes: {
			for: `edit_tDesc`,
		},
		property: {
			textContent: "description",
		},
	});

	const dueDate = createElement("input", {
		attributes: {
			type: `date`,
			id: "edit_tDate",
			name: "due_date",
			value: `${tDate}`,
			required: null,
		},
	});
	const labelDate = createElement("label", {
		attributes: {
			for: `edit_tDesc`,
		},
		property: {
			textContent: "due date",
		},
	});

	const fieldsetPriority = createElement("fieldset", {});
	const legendPriority = createElement("legend", {
		property: { textContent: "priority" },
	});

	const priorities = {};
	for (let i = 1; i <= 3; i++) {
		const inputOpts = {
			attributes: {
				type: "radio",
				id: `edit_p${i}`,
				name: "priorityp",
				value: `p${i}`,
			},
		};

		const labelOpts = {
			attributes: { for: `edit_p${i}` },
			property: { textContent: `priority ${i}` },
		};

		if (i === +tPriority) inputOpts.attributes.checked = null;

		priorities[`p${i}`] = createElement("input", inputOpts);
		priorities[`label_p${i}`] = createElement("label", labelOpts);
	}

	const btnSubmit = createElement("button", {
		attributes: {
			class: "edit-form__btn-submit",
			type: "submit",
		},
		property: {
			textContent: "save",
		},
	});
	const clickHandlerEditTask = (e) => {
		e.stopPropagation();

		if (
			!select("#edit_tName").checkValidity() ||
			!select("#edit_tDate").checkValidity()
		)
			return;

		e.preventDefault();

		const name = select("#edit_tName").value;
		const desc = select("#edit_tDesc").value;
		const dueDate = select("#edit_tDate").value;
		const priority = select(
			".task-edit-form-container input:not(:disabled):checked",
		).value;

		const tContainer = select(".task-container");
		tContainer.removeChild(select(".task-info"));
		const taskInfo = createTaskInfo({ name, desc, dueDate });
		select('.task-container input[type="radio"]').after(taskInfo);

		//priority
		tContainer.setAttribute(tPriorityAttritubte, priority);

		const opts = { name, desc, dueDate, priority };
		const tIndex = getTaskIndex(this);
		emit("editTask", { tIndex, opts });

		this.removeChild(select(".task-edit-form-container"));
		select(".task-container").removeAttribute("style");
	};
	btnSubmit.addEventListener("click", clickHandlerEditTask);

	const btnCancel = createElement("button", {
		attributes: { class: "edit-form__btn-cancel" },
		property: { textContent: "cancel" },
	});

	const clickHandlerEditFormCancel = (e) => {
		e.stopPropagation();
		const editForm = select(".task-edit-form-container");
		const task = select(".task-container");

		this.removeChild(editForm);
		task.removeAttribute("style");
	};
	btnCancel.addEventListener("click", clickHandlerEditFormCancel);

	fieldsetPriority.append(
		legendPriority,
		priorities.p1,
		priorities.label_p1,
		priorities.p2,
		priorities.label_p2,
		priorities.p3,
		priorities.label_p3,
	);
	fieldset.append(
		legend,
		labelNm,
		name,
		labelDesc,
		desc,
		labelDate,
		dueDate,
		fieldsetPriority,
		btnSubmit,
		btnCancel,
	);
	form.appendChild(fieldset);
	formContainer.appendChild(form);
	this.appendChild(formContainer);

	this.querySelector(".task-container").style.display = "none";
}

function clickHandlerDelegateTaskBtn(e) {
	// this can be done by another function which will be responsible for creating
	// add task form during initialzation. We could use the same function to
	// create form for edit and add

	if (e.target.classList.contains("btn-remove-task")) removeTaskBtn.call(this);
	else if (e.target.classList.contains("btn-edit-task")) editTask.call(this);
	else return;
}

function openProject({ tasks }) {
	// reset page
	// remove task list so that tasks of new project
	// can be added
	// remove add project button
	const projectsList = $(".page__projects-list");
	if (projectsList) projectsList.remove();

	const btnAddProject = $(".page__btn-add-project");
	const taskList = $(".page> .task-list");
	if (btnAddProject) btnAddProject.remove();
	if (taskList) taskList.remove();

	page.prepend(createElement("ul", { attributes: { class: "task-list" } }));

	// add tasks to page
	tasks.forEach((task) => showNewTask(task));

	//task form/task button reset
	taskForm.style.display = "none";
	btnAddTask.style.display = "block";
}

function clickHandlerTaskCheckbox(e) {
	let tIndex = undefined;

	const checkboxes = $(".task-list").querySelectorAll(
		'.task-container>input[type="radio"]',
	);
	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i] !== e.target) continue;
		tIndex = i;
		break;
	}
	$(`.task-list>li:nth-child(${tIndex + 1})`).remove();
	emit("taskCompletedLogic", tIndex);
}

function openMyProjects(list, check) {
	if (!check) $(".page .task-list").remove();

	btnAddTask.setAttribute("style", "display: none;");

	const projectsList = createElement("ul", {
		attributes: { class: "page__projects-list" },
	});

	list.forEach((project) => addProjectToMainPage(project, projectsList));

	const addProjectBtn = createElement("button", {
		attributes: { class: "page__btn-add-project" },
		property: { textContent: "add project" },
	});
	addProjectBtn.addEventListener("click", (e) => emit("addProject", e));

	projectsNavPrimary.appendChild(projectsList);
	page.prepend(addProjectBtn);
}

on("projectAdded", addProjectToMainPage);
function addProjectToMainPage(project, ul = $(".page__projects-list")) {
	if (!ul) return;
	const li = createElement("li", {
		attributes: {
			class: "project-list__project-item btn",
			"data-project-name": project.name,
		},
	});

	const projectContainer = createElement("div", {
		attributes: {
			class: "project-item__container f-sb",
		},
	});

	const pName = createElement("h3", {
		property: {
			textContent: project.name,
		},
		attributes: { class: "project-name" },
	});

	const btnContainer = createElement("div", {
		attributes: { class: "page__project-list__btn-container" },
	});

	const btnEdit = createElement("button", {
		attributes: { class: "btn-container__edit" },
		property: { textContent: "edit" },
	});

	const btnRemove = createElement("button", {
		attributes: { class: "btn-container__remove" },
		property: { textContent: "remove" },
	});

	li.addEventListener("click", clickHandlerProjectsInMainPage);

	btnContainer.append(btnEdit, btnRemove);

	projectContainer.append(pName, btnContainer);
	li.appendChild(projectContainer);
	ul.appendChild(li);
}

on("projectRemoved", removeProject);
function removeProject(pName) {
	document
		.querySelectorAll(`li[data-project-name="${pName}"]`)
		.forEach((node) => node.remove());
}

// data-project-name is different from data-projectNm
// fix it
function clickHandlerProjectsInMainPage(e) {
	const projectName = this.getAttribute("data-project-name");
	if (e.target.classList.contains("btn-container__remove"))
		emit("projectRemoved", projectName);
	else if (e.target.classList.contains("btn-container__edit"))
		emit("editProject", projectName);
	// opening the project if none of the buttons are pressed
	else emit("openProject", projectName);
}

on("projectEdited", editProjectMainPage);
function editProjectMainPage({ oldName, name, color }) {
	// currently there is no way to show the colors
	// so I am not doing anything about colors here
	// add them in the future
	const project = $(`.page__projects-list > li[data-project-name="${oldName}"`);
	if (!project) return;
	project.querySelector(".project-name").textContent = name;
	project.setAttribute("data-project-name", name);
}

function render(projectList) {
	const header = Header();
	const dialogEditProject = EditProject();
	const dialogAddProject = AddProject();
	const sidebarComponent = Sidebar(projectList);
	openMyProjects(projectList, "first render");
	$("body").prepend(sidebarComponent, dialogAddProject, dialogEditProject);
	$(".r-side").prepend(header);
}

on("openedProject", openProject);
on("openedMyProjects", openMyProjects);
on("renderApp", render);
