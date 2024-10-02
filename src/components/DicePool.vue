<script setup lang="ts">
import { Dice } from '@/utils';
import type { SwapEventObject } from 'swapy';
import { ref } from 'vue';

const testCount = ref(0)

const { diceList, swapObj} = defineProps<{
    diceList: Dice[],
    swapObj: SwapEventObject | null
}>()

const checkForHideConditions = (dice: Dice) => {

console.log("------------ Separator START ------------")

console.log(`Evaluating swap object at Dice key ${dice.id}`)
if (swapObj && swapObj[dice.id]) {
    console.log(swapObj[dice.id])
    console.log("Slot is occupied")
}
else if (swapObj && !swapObj[dice.id]) {
    console.log(swapObj[dice.id])
    console.log("SLOT IS EMPTY")
    // return false
} 
else {
    console.log("No swap object detected at this time")
}

console.log(swapObj && !swapObj[dice.id])
console.log("------------ Separator END ------------")

console.log(diceList)

return true
}

</script>


<template>
    <div class="pool">
        <template v-for="dice in diceList">
            <div 
            v-if="checkForHideConditions(dice)"
            class="diceholder"
            :data-swapy-slot="dice.id"
            >
                <div 
                class="dice"
                :data-swapy-item="dice.id"
                >
                    <div>{{ dice.value }}</div>
                </div>
            </div>
        </template>
    </div>
    <button @click="console.log(swapObj)">
        Click to see {{ testCount }}
    </button>
</template>