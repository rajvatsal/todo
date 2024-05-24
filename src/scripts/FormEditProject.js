import { emit, off, on } from "./pub-sub";
import { $, createElement } from "./utility";
import { isValidProject } from "./logic";

let editProjectForm;
let btnSubmitRef;
let btnCancelRef;
const colorOpts = ["red", "pink", "yellow", "charcoal"];

const clickHandlerCloseForm = function closeFrom() {
	editProjectForm.close();
	$("dialog.edit-project >form").reset();
};

const clickHandlerSubmitForm = function submitEdits(e) {
	// use variable instead of dom searching for form inputs
	// to make it more efficient
	const name = $("#edit-project-name").value;
	if (!$("#edit-project-name").checkValidity()) return;

	e.preventDefault();
	if (!isValidProject(name)) {
		alert("project exists");
		return;
	}

	const oldName = this.getAttribute("data-project-name");
	const color = $("#edit-project-color > :checked").value;

	editProjectForm.close();
	emit("projectEdited", { oldName, name, color });
};

const appear = function showForm(pName) {
	console.log(pName);
	editProjectForm.showModal();
	btnSubmitRef.setAttribute("data-project-name", pName);
};
on("editProject", appear);

const render = function createFrom() {
	const dialog = createElement("dialog", {
		attributes: {
			class: "edit-project",
		},
	});

	const form = createElement("form", {
		attributes: {
			method: "dialog",
		},
	});

	const fieldset = createElement("fieldset");

	const legend = createElement("legend");

	const label_1 = createElement("label", {
		attributes: {
			for: "edit-project-name",
		},
		property: {
			textContent: "Name: ",
		},
	});

	const input_1 = createElement("input", {
		attributes: {
			id: "edit-project-name",
			type: "text",
			name: "project_name",
			value: "",
			placeholder: "Todo list",
			required: "",
		},
	});

	const select = createElement("select", {
		attributes: {
			id: "edit-project-color",
		},
	});

	const label_2 = createElement("label", {
		attributes: {
			for: "edit-project-color",
		},
		property: { textContent: "Color" },
	});

	const opts = colorOpts.map((color, index) => {
		const elm = createElement("option", {
			attributes: { value: color },
			property: { textContent: color },
		});

		if (index === 0) elm.setAttribute("selected", "");
		return elm;
	});

	const btnSubmit = createElement("button", {
		attributes: {
			type: "submit",
			class: "btn__form-edit-project",
		},
		property: {
			textContent: "edit",
		},
	});

	const btnCancel = createElement("button", {
		attributes: {
			type: "button",
			class: "btn__cancel-edit-project",
		},
		property: {
			textContent: "cancel",
		},
	});

	const btnContainer = createElement("div", {
		attributes: {
			class: "btn-gropup",
		},
	});

	btnContainer.append(btnSubmit, btnCancel);
	select.append(...opts);
	fieldset.append(legend, label_1, input_1, label_2, select, btnContainer);

	form.appendChild(fieldset);
	dialog.appendChild(form);
	editProjectForm = dialog;

	btnSubmitRef = btnSubmit;
	btnCancelRef = btnCancel;

	return dialog;
};

export default function init() {
	const form = render();
	btnSubmitRef.addEventListener("click", clickHandlerSubmitForm);
	btnCancelRef.addEventListener("click", clickHandlerCloseForm);
	return form;
}
