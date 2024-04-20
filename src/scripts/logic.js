import { compareAsc, format } from "date-fns";

const projects = [];

const inNOutInterface = (state) => ({
	type: "inNOutInterface",
	add: (options) => state.add(options, state),
	remove: (pattern) => state.remove(pattern, state),
});

const fetchInterface = (state) => ({
	fetch: () => state.fetch(state),
});

export const projectManager = ((options) => {
	const proto = {
		add: (opts) => {
			opts.selfIndex = projects.length;
			projects.push(opts);
		},
		remove: (ptn) => {
			for (let i = 0; i < projects.length; i++) {
				if (ptn === projects[i].name) projects.splice(i, 1);
			}
		},
		fetch: () => projects.slice(),
	};

	const basic = inNOutInterface(proto);
	const fetch = fetchInterface(proto);
	const composite = Object.assign({}, basic, fetch);
	return Object.assign(Object.create(composite), options);
})();

projectManager.add({ name: "vatsal", color: "charcoal" });
console.log(projectManager.fetch());
