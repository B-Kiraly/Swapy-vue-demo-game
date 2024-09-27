<script setup lang="ts">
import './style.css'
import Dice from './views/Dice.vue';
import SwapyDemo from './views/SwapyDemo.vue';
import { RouterView } from 'vue-router';

</script>

<template>
	<div class="flow">
		<RouterView />
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
