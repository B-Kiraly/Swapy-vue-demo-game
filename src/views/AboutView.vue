<template>
  <div class="about">
    <h1>
      About Drag n Drop Dice
    </h1>
    <p>
      It uses the Swapy library to work its magic. This tool is relatively new and so far (as of September 2024) poorly documented, but it's pretty intuitive to use!
    </p>
  </div>
</template>

<style>

.about {
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.about p {
  max-width: 85%;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
