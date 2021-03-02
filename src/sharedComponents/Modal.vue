<template>
	<div class="modal" @click="closeModal()">
		<div class="modalContent" v-on:click.stop="">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		closeModal() {
			this.$emit("closeModal");
		}
	},
	components: {
	}
}
</script>

<style>
.modal {
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.4);
}
.modalContent {
	position: fixed;
	left: 10%;
	top: 20%;

	width: 400px;
	height: 400px;
	background: gray;
}
</style>