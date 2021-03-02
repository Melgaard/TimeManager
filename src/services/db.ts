module.exports = {
	initDB() {
		if (!localStorage.TMProjects) {

			const startingProjects = [
				{name: 'Rakdos', timeWorked: 10, lastInvoice: 5, completed: false}, 
				{name: 'Izzet', timeWorked: 60, lastInvoice: 0, completed: false},
				{name: 'Dimir', timeWorked: 88, lastInvoice: 0, completed: true}
			];

			localStorage.TMProjects = JSON.stringify(startingProjects);
		}
	},
	loadDB() {
		return JSON.parse(localStorage.TMProjects);
	},
	saveDB(projects) {
		localStorage.TMProjects = JSON.stringify(projects);
	},
}