<script setup lang="ts">
import { createSwapy } from 'swapy'
import { onMounted, ref } from 'vue'
import A from '@/components/A.vue';
import C from '@/components/C.vue';
import D from '@/components/D.vue';

// TEST THIS UNDEFINED ELEMENT BUG

const DEFAULT = {
  '1': 'a',
  '3': 'c',
  '4': 'd',
  '2': null
}
const slotItems: Record<string, 'a' | 'c' | 'd' | null> = localStorage.getItem('slotItem') ? JSON.parse(localStorage.getItem('slotItem')!) : DEFAULT

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

function getItemById(itemId: 'a' | 'c' | 'd' | null) {
  switch (itemId) {
    case 'a':
      return A
    case 'c':
      return C
    case 'd':
      return D
  }
}

// console.log("Wut")
</script>

<template>
    <div 
    class="container"
    ref="container"
    @click="console.log(container)"
    >
   
    <div class="slot a"
      data-swapy-slot="swapy 1">
      <component :is="getItemById(slotItems['1'])" />
    </div>

    <div class="second-row">
      <div class="slot b"
        data-swapy-slot="swapy 2">
        <component :is="getItemById(slotItems['2'])" />
      </div>

      <div class="slot c"
        data-swapy-slot="swapy 3">
        <component :is="getItemById(slotItems['3'])" />
      </div>
    </div>

    <div class="slot d"
      data-swapy-slot="swapy 4">
      <component :is="getItemById(slotItems['4'])" />
    </div>

  </div>
</template>

<style scoped>

</style>
