<template>
	<div class="frontpage">
		<div>
			<span v-for="project in projects" v-bind:key="project.name">
				<Project :project="project" 
					@deleteProject="deleteProject(project)"
					@addTime="addTime"
					@completedToggle="completedToggle"
					/>
			</span>
		</div>
		<div>
			<Button :text="'Create new project'" @clicked="modalToggle" />
		</div>

		<Modal v-if="showCreateModal" @closeModal="modalToggle(false)">
			<h1>Create new project</h1>
			<input type="text" />
			<span v-if="modalErrorText">{{modalErrorText}}</span>
			<Button :text="'Save'" @clicked="modalSave" />
		</Modal>
		
	</div>
</template>

<script>
import Project from '../components/Project.vue';
import Button from '../sharedComponents/Button.vue';
import Modal from '../sharedComponents/Modal.vue';
import DB from '../services/db.ts';
export default {
	name: 'FrontPage',
	components: {
		Project,
		Button,
		Modal,
	},
	data() {
		return {
			projects: null,
			showCreateModal: false,
			modalErrorText: null,
		}
	},
	methods: {
		//Database functions
		loadDB() {
			this.projects = DB.loadDB();
		},
		saveDB() {
			DB.saveDB(this.projects);
		},
		//Visual functions
		modalToggle(state) {
			if (state) this.showCreateModal = state;
			else this.showCreateModal = !this.showCreateModal;
		},
		modalSave() {
			const result = this.createProject('Boros');
			result.success ? this.modalToggle(false) : this.modalErrorText = result.error;
		},
		//Project functions
		createProject(name) {
			if (this.projects.some(project => project.name == name)) {
				return {success: false, error: `Project already exists with name: ${name}`};
			}
			this.projects.push({name: name, timeWorked: 0, lastInvoice: 0, completed: false});
			this.saveDB();
			return {success: true}
		},
		deleteProject(projectToDelete) {
			this.projects = this.projects.filter(project => project.name != projectToDelete.name);
			this.saveDB()
		},
		addTime(projectName, timeWorked) {
			var projectToUpdate = this.projects.find(project => project.name == projectName);
			projectToUpdate.timeWorked += timeWorked;
			this.saveDB()
		},
		completedToggle(projectName) {
			var projectToUpdate = this.projects.find(project => project.name == projectName);
			projectToUpdate.completed = !projectToUpdate.completed;
			this.saveDB()
		}

	},
	watch: {
		showCreateModal(val) {
			val ? null : this.modalErrorText = null;
		}
	},
	async created() {
		DB.initDB();
		this.loadDB();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.frontpage {
	background-color: #424141;
	color: white;
	text-align: center;
}
</style>
