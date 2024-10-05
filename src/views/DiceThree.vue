<script setup lang="ts">
import { createSwapy } from 'swapy'
import type { SwapEventObject } from 'swapy';
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

const container = ref<HTMLDivElement | null>(null) 
// Runs frequently (perhaps every rerender trigger) after being mounted
onMounted(() => {
  if (container.value) {
    const swapy = createSwapy(container.value)
    swapy.onSwap(({ data }) => {
        console.log("on swap activating")
        let sum = sumRowDice(data.object, diceList.value)
        summedDice.value = sum
        mostRecentSwapObject.value = data.object
    })
    swapy.onSwapEnd(({data}) => {
        cleanUpSlots(data.object)
    })

    // see if this works
    onUnmounted(() => {
    console.log("The DiceTwo component has been unmounted, callback running")
    swapy.destroy() // I'm not exactly sure if this could cause problems with localstorage later. Something to remain aware of.
})
  }
})

const cleanUpSlots = (swapObj: SwapEventObject) => {
    // console.log("Searching for empty pool slots")
    // console.log(swapObj)

    let emptyPoolSlots = []

    for (let key in swapObj) {
        // console.log(key.length)
        if (key.length == 8 && !swapObj[key]) {
            console.log(`Slot id.${key} is empty !!`)
            // Now access the slot somehow?
            emptyPoolSlots.push(key)
        }
    }


}

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
    @click="console.log('idk')"
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