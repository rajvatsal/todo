import { createElement, $ } from "./utility.js";
import { on, off, emit } from "./pub-sub.js";
import { isValidProject } from "./logic";

let btnSubmitRef;
let btnCancelRef;
let dialogRef;
let formRef;
let projectName;
let projectColor;
const colorOpts = ["red", "green", "yello", "charcoal"];

const showProjectForm = function showProjectForm(e) {
	e.stopPropagation();
	dialogRef.showModal();
};
const clickHandlerCancelBtn = function cancleProjectCreation() {
	formRef.reset();
	dialogRef.close();
};
const clickHandlerAddBtn = function addProject(e) {
	if (!projectName.checkValidity()) return;

	e.preventDefault();

	if (!isValidProject(projectName.value)) {
		alert("project exists");
		return;
	}

	const name = projectName.value;
	const color = projectColor.value;

	dialogRef.close();
	formRef.reset();

	emit("projectAdded", { name, color });
};

const heading = "create new project";
const render = function renderDialog() {
	const dialog = createElement("dialog", {
		attributes: { class: "add-project" },
	});
	const form = createElement("form");
	const fieldset = createElement("fieldset");
	const legend = createElement("legend", {
		property: { textContent: heading },
	});
	const label_1 = createElement("label", {
		attributes: { for: "project-name" },
		property: { textContent: "Name" },
	});
	const input_1 = createElement("input", {
		attributes: {
			id: "project-name",
			type: "text",
			name: "project_name",
			value: "",
			placeholder: "Todo list",
			required: "",
		},
	});

	const label_2 = createElement("label", {
		attributes: { for: "project-color" },
		property: { textContent: "Color" },
	});
	const input_2 = createElement("select", {
		attributes: {
			id: "project-name",
			type: "text",
			name: "project_name",
			value: "",
			placeholder: "Todo list",
			required: "",
		},
	});
	const sections = colorOpts.map((color, index) => {
		const elem = createElement("option", {
			attributes: { value: color },
			property: { textContent: color },
		});
		if (index === 0) elem.setAttribute("selected", "");
		return elem;
	});

	const btnSubmit = createElement("button", {
		attributes: { class: "btn__form-add-project" },
		property: { textContent: "submit" },
	});
	const btnCancel = createElement("button", {
		attributes: { class: "btn__cancel-project-form" },
		property: { textContent: "cancel" },
	});

	const inputCont_1 = createElement("div", {
		attributes: { class: "input-container" },
	});
	const inputCont_2 = createElement("div", {
		attributes: { class: "input-container" },
	});

	input_2.appendChildren(...sections);
	inputCont_1.appendChildren(label_1, input_1);
	inputCont_2.appendChildren(label_2, input_2);

	fieldset.appendChildren(
		legend,
		inputCont_1,
		inputCont_2,
		btnSubmit,
		btnCancel,
	);
	form.appendChild(fieldset);
	dialog.appendChild(form);

	btnSubmitRef = btnSubmit;
	btnCancelRef = btnCancel;
	dialogRef = dialog;
	formRef = form;
	projectName = input_1;
	projectColor = input_2;

	return dialog;
};

export default function init() {
	const form = render();
	btnCancelRef.addEventListener("click", clickHandlerCancelBtn);
	btnSubmitRef.addEventListener("click", clickHandlerAddBtn);
	return form;
}

on("addProject", showProjectForm);
