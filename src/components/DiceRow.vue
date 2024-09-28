<script setup lang="ts">

// THIS WILL BE THE 'PLAYER ROWS' THAT ARE INITIALLY EMPTY, BUT CAN BE FILLED WITH DATA FROM THE POOL
// probably for it to reach its proper RPG potential, it would need a unique identifier (or its list would) and it would need to filter for its slots' values on each swap. That's the only way I can see separate ref lists and swapy slots remaining synced properly. At least in this library's current state

import { ref, defineProps } from 'vue';
// import type { Ref } from 'vue';
import { Dice} from '@/utils';

const {diceList, idLetter} = defineProps<{
    idLetter: string,
    diceList: Dice[]
}>()

const totalValue = ref(0) // tracks the sum of all dice in the row

// const diceList: Ref<Dice[]> = ref([])
// rather, should it take the dicelist as a prop?

const numSlots = 3

</script>

<template>
    <div class="dicerow">
        <div 
        v-for="_, index in numSlots"
        class="diceholder"
        :data-swapy-slot="idLetter + index"
        >
            <!-- <div 
            class="dice"
            :data-swapy-item="dice.id"
            >
                <div>{{ dice.value }}</div>
            </div> -->
        </div>
        <h1>TOTAL: {{ totalValue }}</h1>
    </div>
</template>

<style scoped>
</style>