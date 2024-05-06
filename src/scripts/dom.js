import { compareAsc, format, intlFormat, weeksToDays } from "date-fns";
import { createElement, $ } from "./utility";
import { on, off, emit } from "./pub-sub";
import { isValidProject } from "./logic";

const btnProjectForm = $(".btn-add-project");
const dialogAddProjectForm = $("dialog.add-project");
const btnDialogAddProject = $(".btn__form-add-project");
const formAddProject = $("dialog.add-project > form");
const ipDialogProjectName = $("#project-name");
const ipDilaogProjectColor = $("#project-color");
const topHeading = $("header>h1");
const taskForm = $(".task-form");
const btnAddTask = $(".page__btn-add-task");
const inputTaskName = $("#task_name");
const inputTaskDate = $("#due_date");
const inputTaskDesc = $("#task_dec");
const page = $(".page");
const btnAddTaskSubmitForm = $(".task-form__btn-add-task");
const btnTaskCancel = $(".task-form__btn-cancel");
const btnMyProjects = $(".btn-project-home");
const btnCancelProjectForm = $(".btn__cancel-project-form");

const tPriorityAttritubte = "data-priority";
const headingHomePage = "My projects";

function getTaskIndex(task) {
	const tasks = document.querySelectorAll(".page .task-list>li");
	for (let i = 0; i < tasks.length; i++) {
		if ((task = tasks[i])) return i;
	}
}

btnMyProjects.addEventListener("click", () => emit("getProjectList"));

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

	infoContainer.appendChildren(h3, p, span);
	return infoContainer;
}

const clickHandlerShowProjectForm = () => dialogAddProjectForm.showModal();
function clickHandlerCancelProjectForm() {
	formAddProject.reset();
	dialogAddProjectForm.close();
}

btnCancelProjectForm.addEventListener("click", clickHandlerCancelProjectForm);
btnProjectForm.addEventListener("click", clickHandlerShowProjectForm);
btnDialogAddProject.addEventListener("click", clickHandlerAddProject);
btnAddTaskSubmitForm.addEventListener("click", clickHandlerTaskFormSubmit);

function clickHandlerAddProject(e) {
	if (!ipDialogProjectName.checkValidity()) return;

	if (!isValidProject(ipDialogProjectName.value)) {
		alert("project exists");
		return;
	}

	e.preventDefault();

	const project = {};
	project.name = ipDialogProjectName.value;
	project.color = ipDilaogProjectColor.value;

	emit("addNewProject", project);
	dialogAddProjectForm.close();
	formAddProject.reset();

	addProjectToSidebar(project);
	if (topHeading.getAttribute("data-is-projects-page") !== "false")
		addProjectToMainPage(project);
}

function clickHandlerProjectBtn(e) {
	const projectName = this.getAttribute("data-project-name");
	if (e.target.classList.contains("side-bar__remove-project-btn"))
		removeProject(projectName);
	else emit("getProjectTasks", projectName);
}

// Only adds project to the project list doesn't change the page. Give a more appropriate name.
function addProjectToSidebar(project) {
	const li = createElement("li", {
		attributes: {
			class: "side-bar__project btn",
			["data-project-name"]: project.name,
		},
	});
	const pContainer = createElement("div", {
		attributes: {
			class: "side-bar__project-container",
		},
	});
	const pName = createElement("span", {
		property: { textContent: project.name },
		attributes: { class: "project-container__name" },
	});
	const buttonContainer = createElement("div", {
		attributes: { class: "side-bar__project-button-container btn" },
	});
	const btnRemove = createElement("button", {
		attributes: { class: "side-bar__remove-project-btn" },
		property: { textContent: "remove" },
	});
	const btnEdit = createElement("button", {
		attributes: { class: "project-edit-button" },
		property: { textContent: "edit" },
	});
	buttonContainer.appendChildren(btnEdit, btnRemove);
	pContainer.appendChildren(pName, buttonContainer);
	li.appendChild(pContainer);

	li.addEventListener("click", clickHandlerProjectBtn);

	// select it dynamincally cuz this container will
	// be removod and added to the dom by some other
	// functions like opneMyPrjects
	$(".side-bar__project-list").appendChild(li);
}

function clickHandlerTaskFormSubmit(e) {
	if (!inputTaskName.checkValidity()) return;
	if (!inputTaskDate.checkValidity()) return;

	e.preventDefault();

	const projectNm = topHeading.getAttribute("data-projectNm");
	const priority = $(
		'.page .task-form input[type="radio"]:not(:disabled):checked',
	);

	const taskOpts = {
		name: `${inputTaskName.value}`,
		dueDate: `${inputTaskDate.value}`,
		desc: `${inputTaskDesc.value}`,
		priority: priority.value,
	};

	emit("addNewTask", [projectNm, taskOpts]);
	showNewTask(taskOpts);
}

function showNewTask(newTask) {
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

	taskContainer.appendChildren(checkBox, taskInfoContainer, editBtn, deleteBtn);
	li.appendChild(taskContainer);
	taskList.appendChild(li);
}

function removeTaskBtn() {
	//this is the list element
	emit("removeTask", {
		tIndex: Array.from(this.parentNode.children).indexOf(this),
		pName: topHeading.getAttribute("data-projectNm"),
	});
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

		const pName = topHeading.getAttribute("data-projectNm");
		const opts = { name, desc, dueDate, priority };
		const tIndex = getTaskIndex(this);
		emit("editTask", { pName, tIndex, opts });

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

	fieldsetPriority.appendChildren(
		legendPriority,
		priorities.p1,
		priorities.label_p1,
		priorities.p2,
		priorities.label_p2,
		priorities.p3,
		priorities.label_p3,
	);
	fieldset.appendChildren(
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

function clickHandlerOpenProject({ tasks, pName }) {
	// reset page
	// remove task list so that tasks of new project
	// can be added
	// remove add project button

	$(".page__btn-add-project").remove();
	const taskList = $(".page> .task-list");
	if (taskList) taskList.remove();

	// if it's my projects page then remove projects list
	if (topHeading.getAttribute("data-is-projects-page") === "true") {
		$(".page__projects-list").remove();
		topHeading.setAttribute("data-is-projects-page", false);
	}
	page.prepend(createElement("ul", { attributes: { class: "task-list" } }));

	// add tasks to page
	tasks.forEach((task) => showNewTask(task));

	topHeading.setAttribute("data-projectNm", pName);
	topHeading.textContent = topHeading.getAttribute("data-projectNm");

	//task form/task button reset
	taskForm.style.display = "none";
	btnAddTask.style.display = "block";
}

function clickHandlerTaskCheckbox(e) {
	const pName = topHeading.getAttribute("data-projectNm");
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
	emit("taskCompletedLogic", { tIndex, pName });
}

function cleanProjects() {
	// remove previous projects
	// we are basically resetting everything so that
	// we can add a fresh list
	const projectsOnMainPage = $(".page__projects-list");
	const projectsOnSidebar = $(".side-bar__project-list");
	const taskList = $(".page > .task-list");

	if (projectsOnSidebar) projectsOnSidebar.remove();
	if (projectsOnMainPage) projectsOnMainPage.remove();
	if (taskList) taskList.remove();
}

function openMyProjects(list) {
	cleanProjects();

	topHeading.textContent = headingHomePage;
	topHeading.setAttribute("data-is-projects-page", true);

	btnAddTask.setAttribute("style", "display: none;");

	const listInPage = createElement("ul", {
		attributes: { class: "page__projects-list" },
	});

	const listInSidebar = createElement("ul", {
		attributes: { class: "side-bar__project-list" },
	});

	// add ul after my projects button in side bar
	btnMyProjects.after(listInSidebar);
	list.forEach((project) => {
		addProjectToMainPage(project, listInPage);
		addProjectToSidebar(project);
	});

	const addProjectBtn = createElement("button", {
		attributes: { class: "page__btn-add-project" },
		property: { textContent: "add project" },
	});

	addProjectBtn.addEventListener("click", clickHandlerShowProjectForm);

	page.prepend(listInPage);
	page.prepend(addProjectBtn);
}

function addProjectToMainPage(project, ul = $(".page__projects-list")) {
	const li = createElement("li", {
		attributes: {
			class: "project-list__project-item btn",
			["data-project-name"]: project.name,
		},
	});

	const projectContainer = createElement("div", {
		attributes: {
			class: "project-item__container flex",
		},
	});

	const pName = createElement("h3", {
		property: {
			textContent: project.name,
		},
		attributes: { class: "project__project-Name" },
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

	btnContainer.appendChildren(btnEdit, btnRemove);

	projectContainer.appendChildren(pName, btnContainer);
	li.appendChild(projectContainer);
	ul.appendChild(li);
}

function removeProject(pName) {
	document
		.querySelectorAll(`li[data-project-name="${pName}"]`)
		.forEach((node) => node.remove());
	emit("removeProject", pName);
}

// data-project-name is different from data-projectNm
// fix it
function clickHandlerProjectsInMainPage(e) {
	const projectName = this.getAttribute("data-project-name");
	if (e.target.classList.contains("btn-container__remove"))
		removeProject(projectName);
	else if (e.target.classList.contains("btn-container__edit")) editProject();
	else emit("getProjectTasks", projectName);
}

// finish it
function editProject() {}

on("return__getProjectTasks", clickHandlerOpenProject);
on("return__getProjectList", openMyProjects);
