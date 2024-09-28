<script setup lang="ts">

// THIS WILL BE THE 'PLAYER ROWS' THAT ARE INITIALLY EMPTY, BUT CAN BE FILLED WITH DATA FROM THE POOL

import { Dice} from '@/utils';

const { idLetter} = defineProps<{
    idLetter: string,
    diceList: Dice[]
}>()

const numSlots = 3 // ok for now but it may be handled elsewhere eventually

</script>

<template>
    <div class="dicerow">
        <div 
        v-for="_, index in numSlots"
        class="diceholder"
        :data-swapy-slot="idLetter + index"
        >
        </div>
    </div>
</template>

<style scoped>
</style>