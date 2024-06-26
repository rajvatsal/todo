import { on, off, emit } from "./pub-sub.js";
import { createElement, $ } from "./utility";

let sidebar;
let hamburger;
let projectListSidebar;
const SMALL_SCREEN = 800;

const clickHandlerHamburger = function toggleNavbar() {
	sidebar.classList.toggle("hidden");
	this.classList.toggle("nav-open");
};

const clickHandlerProjectBtn = function openProject(e) {
	const projectName = this.getAttribute("data-project-name");
	if (e.target.classList.contains("side-bar__remove-project-btn"))
		emit("projectRemoved", projectName);
	// [FIX]: inconsistent class names
	else if (e.target.classList.contains("project-edit-button"))
		emit("editProject", this.getAttribute("data-project-name"));
	else emit("openProject", projectName);
};

const addProject = function addProject(project) {
	const li = createElement("li", {
		attributes: {
			class: "side-bar__project btn",
			"data-project-name": project.name,
		},
	});
	const pContainer = createElement("div", {
		attributes: {
			class: "side-bar__project-container f-sb",
		},
	});
	const pName = createElement("span", {
		property: { textContent: project.name },
		attributes: { class: "project-name" },
	});
	const buttonContainer = createElement("div", {
		attributes: { class: "side-bar__project-button-container" },
	});
	const btnRemove = createElement("button", {
		attributes: { class: "side-bar__remove-project-btn" },
		property: { textContent: "remove" },
	});
	const btnEdit = createElement("button", {
		attributes: { class: "project-edit-button" },
		property: { textContent: "edit" },
	});

	buttonContainer.append(btnEdit, btnRemove);
	pContainer.append(pName, buttonContainer);
	li.appendChild(pContainer);

	li.addEventListener("click", clickHandlerProjectBtn);

	projectListSidebar.appendChild(li);
};
on("projectAdded", addProject);

const editProject = function editProject({ oldName, name, color }) {
	// currently there is no way to show the colors
	// so I am not doing anything about colors here
	// add them in the future
	const project = sidebar.querySelector(`li[data-project-name="${oldName}"`);
	project.querySelector(".project-name").textContent = name;
	project.setAttribute("data-project-name", name);
};
on("projectEdited", editProject);

export default function render(projects) {
	const container = createElement("div");
	const hamburgerContainer = createElement("div", {
		attributes: { class: "hamburger-container" },
	});
	const hamBtn = createElement("button");
	hamburgerContainer.appendChild(hamBtn);

	const myProjects = createElement("div", {
		attributes: { class: "my-projects-container f-sb btn-project-home btn" },
	});
	const myProjectsHeading = createElement("h2", {
		property: { textContent: "My Projects" },
	});
	const buttonAddPro = createElement("button", {
		attributes: { type: "button", class: "btn-add-project" },
		property: { textContent: "+" },
	});
	myProjects.append(myProjectsHeading, buttonAddPro);

	const nav = createElement("nav", {
		attributes: { class: "projects-nav-sidebar" },
	});
	const ul = createElement("ul", {
		attributes: { class: "projects-nav-sidebar__project-list" },
	});
	nav.appendChild(ul);
	container.append(hamburgerContainer, myProjects, nav);

	hamBtn.addEventListener("click", clickHandlerHamburger);
	myProjects.addEventListener("click", () => emit("openMyProjects"));
	buttonAddPro.addEventListener("click", (event) => emit("addProject", event));

	sidebar = container;
	hamburger = hamBtn;
	projectListSidebar = ul;

	// add projects is available
	if (projects) projects.forEach((project) => addProject(project));

	if (window.screen.width < SMALL_SCREEN) {
		sidebar.setAttribute("class", "side-bar hidden");
		hamburger.setAttribute("class", "btn-hamburger");
	} else {
		sidebar.setAttribute("class", "side-bar");
		hamburger.setAttribute("class", "btn-hamburger nav-open");
	}

	return container;
}
