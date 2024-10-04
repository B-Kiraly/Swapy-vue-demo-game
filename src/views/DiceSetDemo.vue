<script setup lang="ts">
import { createSwapy, type Swapy } from 'swapy';
import { onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';
import { Dice } from '@/utils';
import DiceSlot from '@/components/DiceSlot.vue';
import DiceUnit from '@/components/DiceUnit.vue';
import { searchDiceSetById, deleteDiceFromSet, generateDice } from '@/utils';

const diceSet: Ref<Set<Dice>> = ref(new Set([]))

const container = ref<HTMLDivElement | null>(null) // contains the ref of the container where all the data is swapped around in

const swapy: Ref<Swapy | null> = ref(null)

const testContainer = () => {
    console.log(typeof(container))
    if (container) {
        console.log("What can we do with this?")
    }
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
    swapy.value.onSwapEnd(({data, hasChanged}) => {
        // cleanUpSlots(data.object)
        console.log(hasChanged ? "bing" : "bong")
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

        <DiceSlot 
        slotId="a1"
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
                    >
                        <div>{{ dice.value }}</div>
                    </div>
                </div>
            </template>
        </div>
        <button class="button" @click="diceClick">
            Add Dice
        </button>
        <button class="button" @click="testContainer">
            DISABLE/ENABLE
       </button>

        <!-- Needs to exist in the code (I guess a minimum of one swap item?) for swapy to function in Swapy 0.4.1 -->
        <DiceUnit 
        v-show="false"
        :dice="new Dice(3)"
        />
    </div>
</template>

<style scoped>
</style>