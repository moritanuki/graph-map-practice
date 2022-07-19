<template>
  <div id="app">
    <GraphVue msg="TrendGraph"/>
  </div>
</template>

<script>
import GraphVue from './components/GraphVue.vue'

export default {
  name: 'App',
  components: {
    GraphVue
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
