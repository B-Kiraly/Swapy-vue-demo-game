<script setup lang="ts">
import { createSwapy, type SwapEventObject } from 'swapy'
import { onMounted, ref, type Ref } from 'vue'
import A from '@/components/A.vue';
import C from '@/components/C.vue';
import D from '@/components/D.vue';
import { Dice, generateDice, sumRowDice  } from '@/utils';
import DiceRow from '@/components/DiceRow.vue';
import DicePool from '@/components/DicePool.vue';
import DiceUnit from '@/components/DiceUnit.vue';

// TEST THIS UNDEFINED ELEMENT BUG

const DEFAULT = {
  '1': 'a',
  '3': 'c',
  '4': 'd',
  '2': null
}
const slotItems: Record<string, 'a' | 'c' | 'd' | null> = localStorage.getItem('slotItem') ? JSON.parse(localStorage.getItem('slotItem')!) : DEFAULT


const diceList: Ref<Dice[]> = ref([])

const diceRowIds = new Set(["a"])

const container = ref<HTMLDivElement | null>(null) // contains the ref of the container where all the data is swapped around in


onMounted(() => {
  if (container.value) {
    const demoSwapy = createSwapy(container.value)
    demoSwapy.onSwap(({ data }) => {
      console.log("Swap performed")
      // localStorage.setItem('slotItem', JSON.stringify(data.object))
    })
  }
})

const mostRecentSwapObject: Ref<SwapEventObject | null> = ref(null)

const diceClick = () => {
    let newDice = generateDice()
    diceList.value.push(newDice)

}

</script>

<template>
    <h2>bingo!</h2>
    <div 
    class="container"
    ref="container"
    @click="console.log(container)"
    >

    <DiceRow 
    v-for="id in diceRowIds"
    :id-letter="id"
    :dice-list="diceList"
    />

    <DicePool 
    :dice-list="diceList" 
    :swap-obj="mostRecentSwapObject"
    />

    <!-- Needs to exist in the code (I guess a minimum of one swap item?) for swapy to function in Swapy 0.4.1 -->
    <DiceUnit 
    v-show="false"
    :dice="new Dice(3)"
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

h1 {
    /* border: 2px solid black; */
    text-align: center;
    font-weight: 600;
    font-size: 2.2rem;
}

</style>