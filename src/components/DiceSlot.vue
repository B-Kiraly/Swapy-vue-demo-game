<script setup lang="ts">
import { Dice } from '@/utils';

// NOT IMPLEMENTED ANYWHERE YET
// CURRENT ONLY IN THE DICEROW-STYLE CONFIGURATION 

const { diceObj, slotId } = defineProps<{
    diceObj?: Dice,
    slotId: string
}>()

</script>

<template>
    <div 
    class="diceholder"
    :data-swapy-slot="slotId"
    >
        <!-- slot item dice data goes here -->
    </div>
</template>