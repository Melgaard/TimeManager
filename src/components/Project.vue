<template>
	<div class="project" ref="project">
		<div class="header">
			<div class="projectInformation">
				<h1>{{project.name}}</h1>
				<h2>{{hoursWorked}} hours and {{minutesWorked}} minutes</h2>
			</div>
			<Button  @clicked="deleteProject" :text="'&#10007;'"/>
		</div>
		
		<BigButton :icon="'stopwatch'" :currentlyWorking="currentlyWorking" @click="workToggle"/>
		
		<div class="footer">
			<Button :text="'Send Invoice &#9993;'" />
			<Button :text="'&#10003;'" @clicked="completedToggle" :class="[project.completed ? 'completed' : null]"/>
		</div>
	</div>
</template>

<script>
import Button from '../sharedComponents/Button.vue';
import BigButton from './BigButton.vue';
export default {
	name: 'Project',
	props: {
		project: Object,
	},
	components: {
		Button,
		BigButton
	},
	data() {
		return {
			currentlyWorking: false,
			timeOfStart: null,
		}
	},
	methods: {
		deleteProject() {
			this.$emit('deleteProject')
		},
		workToggle() {
			this.currentlyWorking ? 
				this.addTime(Math.round((new Date() - this.timeOfStart) / 60000)) :
				this.timeOfStart = new Date();

			this.currentlyWorking = !this.currentlyWorking;
		},
		addTime(timeWorked) {
			this.$emit('addTime', this.project.name, timeWorked);
		},
		completedToggle() {
			this.$emit('completedToggle', this.project.name);
		}

	},
	computed: {
		hoursWorked() {
			return Math.floor(this.project.timeWorked / 60);
		},
		minutesWorked() {
			return this.project.timeWorked % 60;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.project {
	display: inline-block;
	width: 375px;
	height: 375px;
	margin: 5px;

	position: relative;

	background-color: gray;

	.bigButton {
		margin-left: auto;
		margin-right: auto;
	}
}

.header {
	display: flex;
	padding-left: 5px;
	text-align: left;

	h1 {
		margin: 10px 5px;
		font-size: 20px;
		padding-bottom: 2px;
		border-bottom: 2px solid white;
	}

	h2 {
		margin: 10px 5px;
		font-size: 18px;
	}

	.button {
		width: 20px;
		height: 20px;

		position: absolute;
		right: 0px;
	}
}

.footer {
	display: flex;
	position: absolute;
	bottom: 0px;
	right: 0px;

	padding: 3px;
}

.completed {
	background-color: #29B150 !important;
}
</style>
