<template>
	<div class="button" ref="button" @click="clicked">
		<span v-if="text">{{text}}</span>
		
	</div>
</template>

<script>
export default {
	name: 'Button',
	props: {
		text: String
	},
	methods: {
		clicked() {
			this.$emit('clicked')
		}
	},
	async created() {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.button {
	cursor: pointer;
	width: fit-content;
	padding-top: 5px;
	padding-right: 5px;
	padding-bottom: 5px;
	padding-left: 5px;

	margin: 5px;

	background-color:royalblue;

	span {
		margin-left: 5px;
		margin-right: 5px;
	}
}

</style>
