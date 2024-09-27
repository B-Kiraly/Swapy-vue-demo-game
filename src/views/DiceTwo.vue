<script setup lang="ts">
import { createSwapy } from 'swapy'
import type { Swapy } from 'swapy';
import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue';

const getRandomIntInRange = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Dice {
    value: number
    id: number

    constructor(value: number) {
        this.value = value
        this.id = Math.floor(Math.random() * 100000000)
    }
}

const generateDice = (min=1, max=6) => {
    if (min > max) {
        const maxTemp = max
        max = min
        min = maxTemp
    }
    const numberVal = getRandomIntInRange(min, max)

    const dice = new Dice(numberVal)

    return dice 
}

const diceList: Ref<Dice[]> = ref([])

const filterDiceListById = (id: string) => {
    let numberId = parseInt(id)
    let potentialDice = diceList.value.find(obj => obj.id === numberId)
    return potentialDice
}

const diceClick = () => {
    let newDice = generateDice()
    diceList.value.push(newDice)
    // console.log(diceClick)
}

const container = ref<HTMLDivElement | null>(null) // contains the ref of the container where all the data is swapped around in

const swapy: Ref<Swapy | null> = ref(null)

onMounted(() => {
  if (container.value) {
    swapy.value = createSwapy(container.value, {continuousMode: false})
    swapy.value.onSwap(({ data }) => {
        summedDice.value = 0
        for (let key in data.object) {
            // how i'm currently identifying slots in the sum is by key length
            if (key.length == 1 && data.object[key]) {
                console.log(`There is an object of id ${data.object[key]} at slot id ${key}`)

                let diceObj = filterDiceListById(data.object[key])
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
    console.log("Unmounted component, callback running")
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
        <div class="dicerow">
            <div 
            class="diceholder a"
            :data-swapy-slot="1">
            </div>

            <div 
            class="diceholder b"
            :data-swapy-slot="2">
            </div>

            <div 
            class="diceholder c"
            :data-swapy-slot="3">
                <!-- <div 
                class="dice f"
                data-swapy-item="f">
                <div>F</div>
                </div> -->
            </div>

            <h1>Total Here</h1>

        </div>
        <div class="dicerow">
            <div 
            class="diceholder a"
            :data-swapy-slot="4">
            </div>

            <div 
            class="diceholder b"
            :data-swapy-slot="5">
            </div>

            <div 
            class="diceholder c"
            :data-swapy-slot="6">
                <!-- <div 
                class="dice f"
                data-swapy-item="f">
                <div>F</div>
                </div> -->
            </div>

            <h1>Total Here</h1>

        </div>

    <h1 
    @click="console.log(swapy)"
    >
        Dice pool
    </h1>

    <div class="pool">
        <div 
        v-for="dice in diceList"
        class="diceholder d"
        :data-swapy-slot="dice.id"
        >
            <div 
            class="dice e"
            :data-swapy-item="dice.id"
            >
                <div>{{ dice.value }}</div>
            </div>
        </div>

    </div>

    <button class="button" @click="diceClick">Dice {{ diceList.length }}</button>

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

.dicerow {
    min-height: 40px;
    padding: 1rem;
    border: 4px solid rgb(124, 2, 2);
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.6rem;
}

.diceholder {
    min-width: 100px;
    width: 100%;
    aspect-ratio: 1;
    background: #ffffff;
    flex: 1;
    border: 4px solid rgb(124, 2, 2);
    /* flex-basis: 150px; */
    display: grid;
    place-items: center;
}

</style>