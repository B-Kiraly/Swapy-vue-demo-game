<template>
    <div class="zindex">
        <div class="square top-square">
            C
        </div>
        <div class="square middle-square">
            B
        </div>
        <div class="square bottom-square">
            A
        </div>
    </div>
    
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