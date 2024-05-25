import { emit, off, on } from "./pub-sub";
import { $, createElement } from "./utility";

let headingRef;
const HEADING = "My projects";

const updateCurrentProject = function changeName({ oldName, name }) {
	if (headingRef.textContent !== oldName) return;
	headingRef.textContent = name;
};

const openedProject = function changeName({ pName }) {
	headingRef.textContent = pName;
};

const openHomePage = function openMyProjectsPage() {
	headingRef.textContent = HEADING;
};

const render = function renderHeader() {
	const header = createElement("header");
	const topBarContainer = createElement("div", {
		attributes: {
			class: "topbar-container",
		},
	});

	const headingContainer = createElement("div", {
		attributes: {
			class: "heading",
		},
	});
	const heading = createElement("h1", {
		property: {
			textContent: HEADING,
		},
		attributes: {
			"data-is-projects-page": true,
		},
	});

	headingContainer.appendChild(heading);
	header.append(topBarContainer, headingContainer);

	headingRef = heading;

	return header;
};

export default function init() {
	return render();
}

on("projectEdited", updateCurrentProject);
on("openedMyProjects", openHomePage);
on("openedProject", openedProject);
