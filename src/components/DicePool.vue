<script setup lang="ts">
import { Dice } from '@/utils';
import type { SwapEventObject } from 'swapy';

const { diceList, swapObj} = defineProps<{
    diceList: Dice[],
    swapObj: SwapEventObject | null
}>()

</script>


<template>
    <div class="pool">
        <template 
        v-for="dice in diceList"
        >
            <div 
            :class="`diceholder ${swapObj && !swapObj[dice.id]? 'empty' : ''}`"
            :data-swapy-slot="dice.id"
            >
                <div 
                class="dice"
                :data-swapy-item="dice.id"
                :value="dice"
                >
                    <div>{{ dice.value }}</div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
.empty {
    background-color: rgba(255, 255, 255, 0.9);
    animation: bgOpacity 4s infinite alternate;
    /* display: none; */
}

@keyframes bgOpacity {
    0% {
        background-color: rgba(255, 255, 255, 0.8);
    }

    100% {
        background-color: rgba(255, 255, 255, 0.4);
    }
}
</style>