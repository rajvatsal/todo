import { compareAsc, format, intlFormat, weeksToDays } from "date-fns";
import { emit, off, on } from "./pub-sub";
import { $, createElement } from "./utility";

let btnAddTaskRef;
let btnSubmitTaskRef;
let btnCancelRef;
let taskName;
let taskDate;
let taskDescription;
let taskForm;
let page;

const tPriorityAttritubte = "data-priority";

const getTaskIndex = (task) =>
	[...document.querySelectorAll(".page .task-list>li")].indexOf(task);

function removeTaskBtn() {
	//this is the list element
	emit("removeTask", [...this.parentNode.children].indexOf(this));
	this.remove();
}

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

	if (h3) infoContainer.appendChild(h3);
	if (p) infoContainer.appendChild(p);
	if (span) infoContainer.appendChild(span);

	return infoContainer;
}

function clickHandlerDelegateTaskBtn(e) {
	// this can be done by another function which will be responsible for creating
	// add task form during initialzation. We could use the same function to
	// create form for edit and add

	if (e.target.classList.contains("btn-remove-task")) removeTaskBtn.call(this);
	else if (e.target.classList.contains("btn-edit-task")) editTask.call(this);
	else return;
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

	taskContainer.append(checkBox, taskInfoContainer, editBtn, deleteBtn);
	li.appendChild(taskContainer);
	taskList.appendChild(li);
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
	// biome-ignore lint/complexity/noForEach: <explanation>
	tasks.forEach((task) => showNewTask(task));

	//task form/task button reset
	taskForm.style.display = "none";
	btnAddTaskRef.style.display = "block";
}
function clickHandlerShowTaskForm(e) {
	taskForm.style.display = "block";
	e.target.style.display = "none";
}

function clickHandlerCancelTask() {
	taskForm.style.display = "none";
	btnAddTaskRef.style.display = "block";
}

function clickHandlerTaskFormSubmit(e) {
	if (!taskName.checkValidity()) return;
	if (!taskDate.checkValidity()) return;

	e.preventDefault();

	const priority = $(
		'.page .task-form input[type="radio"]:not(:disabled):checked',
	);

	const taskOpts = {
		name: `${taskName.value}`,
		dueDate: `${taskDate.value}`,
		desc: `${taskDescription.value}`,
		priority: priority.value,
	};

	const isTaskAdded = emit("addNewTask", taskOpts, "addNewTask");
	if (isTaskAdded) showNewTask(taskOpts);
	else alert("project doesn't exist");
}

const createPriorityInput = () => {
	const priorities = ["High", "Medium", "Low"];
	const inputs = [];
	for (let i = 1; i < 4; i++) {
		inputs.push(
			createElement("input", {
				attributes: {
					type: "radio",
					id: `p${i}`,
					name: "priority",
					value: `p${i}`,
				},
			}),
		);
		if (i === 1) inputs[0].setAttribute("checked", "");
		inputs.push(
			createElement("label", {
				property: {
					textContent: `${priorities[i - 1]}`,
				},
				attributes: {
					for: `p${i}`,
				},
			}),
		);
	}
	return inputs;
};

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
			type: "text",
			id: "edit_tName",
			name: "task_name",
			placeholder: "task name",
			value: `${tName}`,
			required: null,
		},
	});
	const labelNm = createElement("label", {
		attributes: {
			for: "edit_tName",
		},
		property: {
			textContent: "name",
		},
	});

	const desc = createElement("input", {
		attributes: {
			type: "textarea",
			id: "edit_tDesc",
			name: "task_desc",
			placeholder: "description",
			value: `${tDesc}`,
		},
	});
	const labelDesc = createElement("label", {
		attributes: {
			for: "edit_tDesc",
		},
		property: {
			textContent: "description",
		},
	});

	const dueDate = createElement("input", {
		attributes: {
			type: "date",
			id: "edit_tDate",
			name: "due_date",
			value: `${tDate}`,
			required: null,
		},
	});
	const labelDate = createElement("label", {
		attributes: {
			for: "edit_tDesc",
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

const render = function render() {
	const main = createElement("main", { attributes: { class: "page" } });
	const nav = createElement("nav", {
		attributes: { class: "page__projects-nav-primary" },
	});

	const btnAddTask = createElement("button", {
		attributes: { class: "page__btn-add-task" },
		property: { textContent: "Add Task" },
	});

	const form = createElement("form", {
		attributes: { method: "post", action: "", class: "task-form" },
	});

	const fieldset = createElement("fieldset");
	const legend = createElement("legend", {
		property: { textContent: "Add Task" },
	});

	const inputName = createElement("input", {
		attributes: {
			type: "text",
			id: "task_name",
			name: "task_name",
			value: "",
			placeholder: "Name",
		},
	});

	const inputDescription = createElement("input", {
		attributes: {
			type: "textarea",
			id: "task_dec",
			name: "task_desc",
			value: "",
			placeholder: "Description",
			maxlength: "50ch",
		},
	});

	const inputDate = createElement("input", {
		attributes: {
			type: "date",
			id: "due_date",
			name: "due_date",
			value: "",
			required: "",
		},
	});

	const fieldsetPriority = createElement("fieldset");
	const legendPriority = createElement("legend", {
		property: { textContent: "priorities" },
	});
	const priorities = createPriorityInput();

	const btnContainer = createElement("div", {
		attributes: { class: "btn-container" },
	});
	const btnSubmit = createElement("button", {
		attributes: { type: "submit", class: "task-form__btn-add-task" },
		property: { textContent: "submit" },
	});
	const btnCancel = createElement("button", {
		attributes: { type: "button", class: "task-form__btn-cancel" },
		property: { textContent: "cancel" },
	});

	btnContainer.append(btnSubmit, btnCancel);
	fieldsetPriority.append(legendPriority, ...priorities);
	fieldset.append(
		legend,
		inputName,
		inputDescription,
		inputDate,
		fieldsetPriority,
		btnContainer,
	);
	form.appendChild(fieldset);

	main.append(nav, btnAddTask, form);

	btnAddTaskRef = btnAddTask;
	btnSubmitTaskRef = btnSubmit;
	btnCancelRef = btnCancel;

	taskName = inputName;
	taskDate = inputDate;
	taskDescription = inputDescription;
	taskForm = form;
	page = main;
	return main;
};

export default function init() {
	const component = render();
	btnAddTaskRef.addEventListener("click", clickHandlerShowTaskForm);
	btnCancelRef.addEventListener("click", clickHandlerCancelTask);
	btnSubmitTaskRef.addEventListener("click", clickHandlerTaskFormSubmit);

	btnAddTaskRef.setAttribute("style", "display: none;");
	return component;
}

on("openedProject", openProject);
