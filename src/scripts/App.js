import Main from "./Main.js";
import Header from "./Header.js";
import Sidebar from "./Sidebar";
import AddProject from "./AddProjectDialog.js";
import EditProject from "./FormEditProject.js";
import { emit, off, on } from "./pub-sub";
import { $, createElement } from "./utility";
import { isValidProject } from "./logic";

function render(projectList) {
	const header = Header();
	const dialogEditProject = EditProject();
	const dialogAddProject = AddProject();
	const sidebarComponent = Sidebar(projectList);
	const main = Main();
	$("body").prepend(sidebarComponent, dialogAddProject, dialogEditProject);
	$(".r-side").append(header, main);

	emit("openedMyProjects", projectList);
}

on("renderApp", render);
