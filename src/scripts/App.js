import Main from "./Main.js";
import Header from "./Header.js";
import Sidebar from "./Sidebar";
import AddProject from "./AddProjectDialog.js";
import EditProject from "./FormEditProject.js";
import { emit, off, on } from "./pub-sub";
import { $, createElement } from "./utility";
import { isValidProject } from "./logic";

let page = $(".page");
let projectsNavPrimary;

// Only adds project to the project list doesn't change the page. Give a more appropriate name.

function openMyProjects(list, check) {
	if (!check) $(".page .task-list").remove();

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
	const main = Main();
	$("body").prepend(sidebarComponent, dialogAddProject, dialogEditProject);
	$(".r-side").append(header, main);

	projectsNavPrimary = $(".page__projects-nav-primary");
	page = $(".page");

	openMyProjects(projectList, "first render");
}

on("openedMyProjects", openMyProjects);
on("renderApp", render);
