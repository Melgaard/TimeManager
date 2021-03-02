<template>
	<div class="bigButton" ref="bigButton" @click="clicked">
		<img src="../assets/stopwatch.png" v-if="icon == 'stopwatch'"/>
		<span>{{text}}</span>
		
	</div>
</template>

<script>
export default {
	name: 'BigButton',
	props: {
		text: String,
		icon: String
	},
	methods: {
		clicked() {
			this.$emit('clicked')
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.bigButton {
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 200px;
	margin-bottom: 10px;
	padding: 10px;
	border-radius: 25px;
	box-shadow: 5px 5px black;

	background-color: indianred; //#29B150

	&:active {
		box-shadow: none;
		position: relative;
		top: 5px;
		left: 5px;
	}
	
	img {
		width: 150px;
		margin-bottom: 5px;
		user-select: none;
	}

	span {
		margin-left: 5px;
		margin-right: 5px;
	}
}

</style>
