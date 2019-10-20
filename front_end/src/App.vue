<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <a id="downloadAnchorElem" style="display:none"></a>
    <router-view/>
  </div>
</template>

<style lang="scss">
body, html{
  margin:0;
  padding:0;
}
// remove text-align center from root
// https://stackoverflow.com/questions/46215197/mapbox-mapbox-gl-vue-renders-the-map-on-only-50-of-the-width-of-the-container
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
// #nav {
//   height: $navbar-height;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
