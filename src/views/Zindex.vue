<script setup lang="ts">
import { ref } from 'vue';

const toggleSquare = ref(true)
const testCount = ref(0)

const handleSquareToggle = () => {
    console.log("toggler accessed")
    toggleSquare.value = !toggleSquare.value
}

const testBoolean = () => {

    console.log("HEY")
    
    if (toggleSquare.value) return true
    else return false
}

const theNum = 3

// to test to see if random renders or other things trigger the v-if tags on other things
const handleOtherClick = () => {
    console.log("Handling the other click")
    testCount.value += 1
}
</script>

<template>
    <button 
    class="button" 
    @click="handleSquareToggle"
    v-for="_ in theNum"
    >
        <h2 v-if="testBoolean()">
            Square Toggle {{ toggleSquare ? "On" : "Off" }}
        </h2>
    </button>
    <div class="zindex">
        <div class="square top-square">
            C
        </div>
        <div class="square middle-square">
            B
        </div>
        <div class="square bottom-square">
            A {{ testCount }}
        </div>
    </div>
    <button @click="handleOtherClick">
        Irrelevant Test
    </button>
    
</template>
  
  <style>

    .zindex {
        position: relative;
        background-color: antiquewhite;
    }

    .square {
        position: relative;
        cursor: pointer;
        border: 2px solid black;
        color: white;
        font-weight: 800;
        font-size: 2rem;
        /* aspect-ratio: 1;
        display: grid;
        place-items: center; */
        opacity: 0.9;
    }

    .bottom-square {
        /* z-index: 0; */
        margin-top: -50px;
        background: red;
        width: 12rem;
        height: 12rem;
    }
  
    .middle-square {
        /* z-index: 2; */
        margin-top: -50px;
        background: blue;
        width: 10rem;
        height: 10rem;
    }
  
    .top-square {
        z-index: 1;
        background: green;
        width: 8rem;
        height: 8rem;
    }
  
  </style>