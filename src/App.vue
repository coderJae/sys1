<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html,body{
   margin:0;
}

@font-face {
  font-family: "txwhgzb";
  src: url(assets/fonts/font.ttf) format("truetype");
  font-weight:lighter;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height:100%;
}
</style>
