<script setup lang="ts">
import { createSwapy } from 'swapy'
import type { Swapy, SwapEventObject } from 'swapy';
import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue';
import { Dice, generateDice, sumRowDice } from '@/utils';
import DiceRow from '@/components/DiceRow.vue';

// THE VIEWS PURPOSE IS TO BE THE GUINEA PIG TO THE MAIN DICE VIEWS MORE POLISHED PRESENTATION

// to create unique identifiers for the slots in each diceRow component
const diceRowIds = new Set(["a"])

const dicePoolList: Ref<Dice[]> = ref([])

const diceClick = () => {
    let newDice = generateDice()
    dicePoolList.value.push(newDice)
    // console.log(diceClick)
}

const container = ref<HTMLDivElement | null>(null) // contains the ref of the container where all the data is swapped around in

const swapy: Ref<Swapy | null> = ref(null)

onMounted(() => {
  if (container.value) {
    swapy.value = createSwapy(container.value)
    swapy.value.onSwap(({ data }) => {
        let sum = sumRowDice(data.object, dicePoolList.value)
        summedDice.value = sum
        cleanUpSlots(data.object)
    })
  }
})

const cleanUpSlots = (swapObj: SwapEventObject) => {
    console.log("Searching for empty pool slots")
    console.log(swapObj)
    // let testBadKey = swapObj["bingo"]? "value found" : "value missing"
    // console.log(testBadKey)

    for (let key in swapObj) {
        console.log(key.length)
        if (key.length == 8 && !swapObj[key]) {
            console.log(`Slot id.${key} is empty !!`)
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
        Dice Two
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
        />
    <h1 
    @click="console.log(swapy)"
    >
        Dice pool
    </h1>

        <div class="pool">
            <div 
            v-for="dice in dicePoolList"
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
        </div>

        <button 
        class="button" 
        @click="diceClick"
        >
        Dice {{ dicePoolList.length }}
        </button>

   </div>
   
</template>

<style scoped>

h1 {
    /* border: 2px solid black; */
    text-align: center;
    font-weight: 600;
    font-size: 2.2rem;
}

</style>