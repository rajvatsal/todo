import Main from "./Main.js";
import Header from "./Header.js";
import Sidebar from "./Sidebar";
import AddProject from "./AddProjectDialog.js";
import EditProject from "./FormEditProject.js";
import { emit, off, on } from "./pub-sub";
import { $, createElement } from "./utility";

const body = $("body");

const render = (projectList) => {
	//conponents
	const header = Header();
	const dialogEditProject = EditProject();
	const dialogAddProject = AddProject();
	const sidebarComponent = Sidebar(projectList);
	const main = Main();

	const content = createElement("div", { attributes: { class: "content" } });
	const rightSide = createElement("div", { attributes: { class: "r-side" } });

	rightSide.append(header, main);
	content.prepend(
		sidebarComponent,
		dialogAddProject,
		dialogEditProject,
		rightSide,
	);

	return content;
};

const init = (projectList) => {
	const content = render(projectList);
	body.appendChild(content);
	emit("openedMyProjects", projectList);
};

on("renderApp", init);
