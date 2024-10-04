<script setup lang="ts">
import { Dice } from '@/utils';
import { ref } from 'vue';

const testCount = ref(0)

// const emit = defineEmits<{
//   modify: [value: number]
// }>()

const { dice } = defineProps<{
    dice: Dice,
}>()

</script>

<template>
    <div 
    class="dice"
    :data-swapy-item="dice.id"
    :value="dice"
    >
        <div>{{ dice.value }}</div>
    </div>
</template>