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

const showProjectForm = () => dialogAddProject.showModal();
btnAddProject.addEventListener("click", showProjectForm);

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

btnDialogAddProject.addEventListener("click", clickHandlerAddProject);

function showNewProject(project) {
	const li = createElement("li");
	const projectOptions = {
		property: { textContent: project.name },
		attributes: { style: `border: 1px solid ${project.color}` },
	};
	const btnOpenProject = createElement("button", projectOptions);
	li.appendChild(btnOpenProject);
	projectList.appendChild(li);
}

on("showNewProject", showNewProject);
