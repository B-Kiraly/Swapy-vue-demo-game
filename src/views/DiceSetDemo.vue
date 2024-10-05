<script setup lang="ts">
import { createSwapy, type Swapy } from 'swapy';
import { onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';
import { Dice } from '@/utils';
import DiceSlot from '@/components/DiceSlot.vue';
import DiceUnit from '@/components/DiceUnit.vue';
import DiceRow from '@/components/DiceRow.vue';
import { searchDiceSetById, deleteDiceFromSet, generateDice } from '@/utils';

const diceRowIds = new Set(["a"])

const diceSet: Ref<Set<Dice>> = ref(new Set([]))
const summedDice = ref(0)
const selectedDice: Ref<Dice | null> = ref(null)

const container = ref<HTMLDivElement | null>(null) // contains the ref of the container where all the data is swapped around in

const swapy: Ref<Swapy | null> = ref(null)

const setSelectedDice = (dice: Dice) => {
    selectedDice.value = dice
}

const diceClick = () => {
    let newDice = generateDice()
    diceSet.value.add(newDice)
}

// Runs frequently (perhaps every rerender trigger) after being mounted
onMounted(() => {
  if (container.value) {
    swapy.value = createSwapy(container.value)
    swapy.value.onSwap(({ data }) => {
        console.log("on swap activating")
        // summedDice.value = sum
    })
    swapy.value.onSwapEnd(({data}) => {
        // cleanUpSlots(data.object)
    })
  }
})

</script>

<template>

    <div 
    class="demo"
    ref="container"
    >
        <h1>SETS OF DICE</h1>

        <h2>Sum: {{ summedDice }}</h2>

        <DiceRow 
        v-for="id in diceRowIds"
        :id-letter="id"
        :dice-list="diceSet"
        />
    
        <div class="pool">
            <template 
            v-for="dice in diceSet"
            >
                <div 
                :class="`diceholder`"
                :data-swapy-slot="dice.id"
                >
                    <div 
                    class="dice"
                    :data-swapy-item="dice.id"
                    :value="dice"
                    @mouseenter="setSelectedDice(dice)"
                    >
                        <div>{{ dice.value }}</div>
                    </div>
                </div>
            </template>
        </div>
        <button class="button" @click="diceClick">
            Add Dice
        </button>
        <h3>Dice selected: {{ selectedDice? selectedDice.id : "None"}}</h3>
    </div>
</template>

<style scoped>
</style>