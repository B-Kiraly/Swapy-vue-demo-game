<script setup lang="ts">
import './style.css'
import Dice from './Dice.vue';
import SwapyDemo from './SwapyDemo.vue';
import { RouterView } from 'vue-router';

</script>

<template>
	<div class="flow">
		<SwapyDemo />
		<!-- <Dice /> -->
		<!-- <RouterView /> -->
	</div>
  

</template>

<style scoped>
	.flow {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
