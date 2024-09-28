<script setup lang="ts">
import { createSwapy } from 'swapy'
import type { Swapy } from 'swapy';
import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue';
import { Dice, generateDice } from '@/utils';
import DiceRow from '@/components/DiceRow.vue';

// THE VIEWS PURPOSE IS TO BE THE GUINEA PIG TO THE MAIN DICE VIEWS MORE POLISHED PRESENTATION

// to create unique identifiers for the slots in each diceRow component
const diceRowIds = new Set(["a", "b"])

const dicePoolList: Ref<Dice[]> = ref([])

const filterdicePoolListById = (id: string) => {
    let numberId = parseInt(id)
    let potentialDice = dicePoolList.value.find(obj => obj.id === numberId)
    return potentialDice
}

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
        summedDice.value = 0
        for (let key in data.object) {
            console.log(key)
            // how i'm currently identifying slots in the sum is by key length
            if (key.length == 2 && data.object[key]) {
                console.log(`There is an object of id ${data.object[key]} at slot id ${key}`)

                let diceObj = filterdicePoolListById(data.object[key])
                if (diceObj) {
                    console.log(`Found a dice with a value of ${diceObj.value}!`)
                    summedDice.value += diceObj.value
                }
            }
        }
    })
  }
})

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
    class="demo-container"
    ref="container"
    >
        <DiceRow 
        v-for="id in diceRowIds"
        :id-letter="id"
        :dice-list="dicePoolList"
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

.demo-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
    padding: 10px;
}

.pool {
    min-height: 200px;
    background-color: rgb(117, 77, 3);
    border: 7px solid blue;
    place-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

</style>