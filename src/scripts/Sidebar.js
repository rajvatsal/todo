import { on, off, emit } from "./pub-sub.js";
import { createElement, $ } from "./utility";

const sidebar = $(".side-bar");
const hamburger = $(".btn-hamburger");
const projectListSidebar = $(".projects-nav-sidebar__project-list");

const clickHandlerHamburger = function toggleNavbar() {
	sidebar.classList.toggle("hidden");
	this.classList.toggle("nav-open");
};

hamburger.addEventListener("click", clickHandlerHamburger);

const clickHandlerProjectBtn = function openProject(e) {
	const projectName = this.getAttribute("data-project-name");
	if (e.target.classList.contains("side-bar__remove-project-btn"))
		emit("projectRemoved", projectName);
	// [FIX]: inconsistent class names
	else if (e.target.classList.contains("project-edit-button"))
		emit("editProject", this.getAttribute("data-project-name"));
	else emit("getProjectTasks", projectName);
};

const addProject = function addProject(project) {
	const li = createElement("li", {
		attributes: {
			class: "side-bar__project btn",
			["data-project-name"]: project.name,
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

	buttonContainer.appendChildren(btnEdit, btnRemove);
	pContainer.appendChildren(pName, buttonContainer);
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
	projects.forEach((project) => addProject(project));

	// min-widnow size should match the media query min-width in css
	// should sidebar be opened or closed on the first render
	// Set hamburger animation only during the first render of the app
	// if done inside openMyProjects then multiple eventlisteners
	// will be added to the same element each time you open my projects page
	if (window.screen.width < 800) {
		sidebar.setAttribute("class", "side-bar hidden");
		hamburger.setAttribute("class", "btn-hamburger");
	} else {
		sidebar.setAttribute("class", "side-bar");
		hamburger.setAttribute("class", "btn-hamburger nav-open");
	}
}
