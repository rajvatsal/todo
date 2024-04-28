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
const btnAddTask = document.querySelector(".page__btn-add-task");
const inputTaskName = document.querySelector("#task_name");
const inputTaskDate = document.querySelector("#due_date");
const inputTaskDesc = document.querySelector("#task_dec");
const inputTaskPriorities = Array.from(
	document.querySelectorAll('.task-form input[type="radio"]'),
);
const page = document.querySelector(".page");
const btnAddTaskSubmitForm = document.querySelector(".task-form__btn-add-task");
const btnTaskCancel = document.querySelector(".task-form__btn-cancel");

function clickHandlerAddTaskPage(e) {
	taskForm.style.display = "block";
	e.target.style.display = "none";
}

function clickHandlerCancelTask() {
	taskForm.style.display = "none";
	btnAddTask.style.display = "block";
}

btnAddTask.addEventListener("click", clickHandlerAddTaskPage);
btnTaskCancel.addEventListener("click", clickHandlerCancelTask);

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
btnAddTaskSubmitForm.addEventListener("click", clickHandlerTaskFormSubmit);

function clickHandlerTaskFormSubmit(e) {
	if (!inputTaskName.checkValidity()) return;
	if (!inputTaskDate.checkValidity()) return;

	e.preventDefault();

	const projectNm = topHeading.textContent;
	const [priority] = inputTaskPriorities.filter((priority) => priority.checked);

	const taskOpts = {
		name: `${inputTaskName.value}`,
		dueDate: `${inputTaskDate.value}`,
		desc: `${inputTaskDesc.value}`,
		priority: priority.value,
	};

	emit("addNewTask", [projectNm, taskOpts]);
	showNewTask(taskOpts);
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

	showNewProject(project);
}

function clickHandlerProjectBtn(e) {
	emit("getProjectTasks", e.target.textContent);
}

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
	btnOpenProject.addEventListener("click", clickHandlerProjectBtn);
	li.appendChild(btnOpenProject);
	projectList.appendChild(li);
}

function showNewTask(newTask) {
	const taskList = document.querySelector(".task-list");
	const li = createElement("li", {
		attributes: {
			style: `border: 1px solid ${priorityManager.getPriorityColor(
				newTask.priority,
			)}`,
		},
	});

	li.addEventListener("click", clickHandlerDelegateEditTask);

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

	const taskContainer = createElement("div", {
		attributes: {
			class: "task-container",
			"data-task-priority": newTask.priority,
		},
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

	const editBtn = createElement("button", {
		attributes: {
			class: "btn-edit-task",
		},
		property: { textContent: "edit" },
	});

	taskInfoContainer.appendChild(h3);
	if (p !== undefined) taskInfoContainer.appendChild(p);
	taskInfoContainer.appendChild(span);
	taskContainer.appendChild(checkBox);
	taskContainer.appendChild(taskInfoContainer);
	taskContainer.appendChild(editBtn);
	li.appendChild(taskContainer);
	taskList.appendChild(li);
}

function clickHandlerDelegateEditTask(e) {
	// this can be done by another function which will be responsible for creating add task form during initialzation. We could use the same function to create form for edit and add

	e.stopPropagation();
	if (!e.target.classList.contains("btn-edit-task")) return;

	const tName = this.querySelector(".task-info .name").textContent;
	let tDesc = this.querySelector(".task-info .desc");
	tDesc = tDesc === null ? "" : tDesc.textContent;
	const tDate = this.querySelector(".task-info .due-date").textContent;
	const tPriority = this.querySelector(".task-container")
		.getAttribute("data-task-priority")
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
			textContent: "edit",
		},
	});
	const btnCancel = createElement("button", {
		attributes: { class: "edit-form__btn-cancel" },
		property: { textContent: "cancel" },
	});

	const clickHandlerEditFormCancel = (e) => {
		e.stopPropagation();
		const editForm = this.querySelector(".task-edit-form-container");
		const task = this.querySelector(".task-container");

		this.removeChild(editForm);
		task.style.display = "flex";
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
	formContainer.appendChild(form.appendChild(fieldset));
	this.appendChild(formContainer);

	this.querySelector(".task-container").style.display = "none";
}

function clickHandlerOpenProject({ tasks, pName }) {
	const taskList = document.querySelector(".task-list");
	page.removeChild(taskList);
	page.prepend(createElement("ul", { attributes: { class: "task-list" } }));
	tasks.forEach((task) => showNewTask(task));
	topHeading.textContent = pName;

	//task form/task button reset
	taskForm.style.display = "none";
	btnAddTask.style.display = "block";
}

function clickHandlerTaskCheckbox(e) {
	const pName = topHeading.textContent;
	let tIndex = undefined;

	const tList = document.querySelector(".task-list");
	const checkboxes = tList.querySelectorAll(
		'.task-container>input[type="radio"]',
	);
	for (let i = 0; i < tList.length; i++) {
		if (checkboxes[i] !== e.target) continue;
		tIndex = i;
		break;
	}
	const li = document.querySelector(`.task-list>li:nth-child(${tIndex + 1})`);
	tList.removeChild(li);
	emit("taskCompletedLogic", { tIndex, pName });
}

on("return__getProjectTasks", clickHandlerOpenProject);
