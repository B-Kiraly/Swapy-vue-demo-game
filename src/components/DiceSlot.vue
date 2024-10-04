<script setup lang="ts">
import { Dice } from '@/utils';
import DiceUnit from './DiceUnit.vue';

// CURRENT ONLY IN THE DICEROW-STYLE CONFIGURATION 

const { slotId, diceObj } = defineProps<{
    slotId: string,
    diceObj?: Dice
}>()

</script>

<template>
    <div 
    class="diceholder"
    :data-swapy-slot="slotId"
    >
        <!-- slot item dice data goes here -->
         <DiceUnit 
         v-if="diceObj"
         :dice="diceObj"
         />
    </div>
</template>