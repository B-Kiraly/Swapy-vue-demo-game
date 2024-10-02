<script setup lang="ts">

// THIS WILL BE THE 'PLAYER ROWS' THAT ARE INITIALLY EMPTY, BUT CAN BE FILLED WITH DATA FROM THE POOL

import type { SwapEventObject } from 'swapy';
import { ref } from 'vue';

const { idLetter, swapObj = null} = defineProps<{
    idLetter: string,
    swapObj?: SwapEventObject | null
}>()

const idString = ref(null)

const numSlots = 3 // ok for now but it may be handled elsewhere eventually

const hideEmpty = false

const hideIfDefined = (id: string) => {

    if (swapObj && swapObj[id]) return false
    else return true
}

</script>

<template>
    <div class="dicerow">
        <template v-for="_, index in numSlots">
            <div 
            class="diceholder"
            :data-swapy-slot="idLetter + index"
            >
                <!-- slot item dice data goes here -->
            </div>
        </template>
    </div>
</template>

<style scoped>
</style>