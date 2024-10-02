<script setup lang="ts">
import { createSwapy } from 'swapy'
import type { Swapy, SwapEventObject } from 'swapy';
import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue';
import { Dice, generateDice, sumRowDice } from '@/utils';
import DiceRow from '@/components/DiceRow.vue';
import DicePool from '@/components/DicePool.vue';

// THE VIEWS PURPOSE IS TO BE THE GUINEA PIG TO THE MAIN DICE VIEWS MORE POLISHED PRESENTATION

// to create unique identifiers for the slots in each diceRow component
const diceRowIds = new Set(["a"])

// DO ALL OF THESE ACTUALLY NEED TO BE REFS???
const diceList: Ref<Dice[]> = ref([])
// const slotIdList: Ref<number[]> = ref([])
const mostRecentSwapObject: Ref<SwapEventObject | null> = ref(null)

const diceClick = () => {
    let newDice = generateDice()
    diceList.value.push(newDice)

}

const container = ref<HTMLDivElement | null>(null) // contains the ref of the container where all the data is swapped around in

const swapy: Ref<Swapy | null> = ref(null)

// Runs frequently (perhaps every rerender trigger) after being mounted
onMounted(() => {
  if (container.value) {
    swapy.value = createSwapy(container.value)
    swapy.value.onSwap(({ data }) => {
        let sum = sumRowDice(data.object, diceList.value)
        summedDice.value = sum
        mostRecentSwapObject.value = data.object
        cleanUpSlots(data.object)
    })
  }
})

const cleanUpSlots = (swapObj: SwapEventObject) => {
    // console.log("Searching for empty pool slots")
    // console.log(swapObj)

    for (let key in swapObj) {
        // console.log(key.length)
        if (key.length == 8 && !swapObj[key]) {
            // console.log(`Slot id.${key} is empty !!`)
            // Now access the slot somehow?
        }
    }

}

onUnmounted(() => {
    console.log("The DiceTwo component has been unmounted, callback running")
    swapy.value?.destroy() // I'm not exactly sure if this could cause problems with localstorage later. Something to remain aware of.
})

const summedDice = ref(0)

</script>

<template>
    <h2>
        DICE THREE
    </h2>
    <h1>
        Sum: {{ summedDice }}
    </h1>
    <div 
    class="dice-demo"
    ref="container"
    >
        <DiceRow 
        v-for="id in diceRowIds"
        :id-letter="id"
        :dice-list="diceList"
        :swap-obj="mostRecentSwapObject"
        />
    <h1 
    @click="console.log(swapy)"
    >
        Dice pool
    </h1>

        <DicePool 
        :dice-list="diceList" 
        :swap-obj="mostRecentSwapObject"
        />

        <button 
        class="button" 
        @click="diceClick"
        >
        Dice {{ diceList.length }}
        </button>

   </div>
   
</template>

<style scoped>
    .pool {
        background-color: aqua;
    }
</style>