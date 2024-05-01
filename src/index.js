import "./scripts/dom.js";
import app from "./scripts/logic.js";

emit("return__getProjectList", ProjectManager.fetchAll());
