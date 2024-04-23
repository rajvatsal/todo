import { compareAsc, format } from "date-fns";
import { createElement } from "./utility";
import { on, off, emit } from "./pub-sub";
import { createHtmlTagObject } from "html-webpack-plugin";

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
const taskList = document.querySelector(".task-list");

const showProjectForm = () => dialogAddProject.showModal();
btnAddProject.addEventListener("click", showProjectForm);

btnDialogAddProject.addEventListener("click", clickHandlerAddProject);

btnAddTask.addEventListener("click", clickHandlerAddTask);

function clickHandlerAddTask(e) {
	if (!inputTaskName.checkValidity()) return;
	if (!inputTaskDate.checkValidity()) return;

	e.preventDefault();

	const projectNm = topHeading.textContent;
	const newTask = emit("addNewTask", [
		projectNm,
		{
			name: `${inputTaskName.value}`,
			dueDate: `${inputTaskDate.value}`,
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

function clickHandlerProjectBtn(e) {
	topHeading.textContent = e.target.textContent;
	taskForm.style.display = "block";
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

// function showNewTask(newTask) {
// 	const li = createElement("li");
// 	const div = createElement("div");
// 	const h3 = createElement("h3", {
// 		property: { textContent: `${newTask.name}` },
// 	});
// 	let p;
// 	if (!newTask.desc)
// 		p = createElement("p", { property: { textContent: `${newTask.desc}` } });
// 	const span = createElement("span", { attributes: { class: "due-date" } });
// 	div.appendChild(h3);
// 	if (p !== undefined) div.appendChild(p);
// 	div.appendChild(span);
// 	li.appendChild(div);
// 	taskList.appendChild(li);
// }

on("showNewProject", showNewProject);
// on("showNewTask", showNewTask);
