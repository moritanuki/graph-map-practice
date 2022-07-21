<template>
  <div id="app">
    <button @click="plot">Plot Chart & Line</button>
    <graphVue ref="graph"></graphVue>
    <mapVue ref="map"></mapVue>
  </div>
</template>

<script>
import GraphVue from "./components/GraphVue"
import MapVue from "./components/MapVue"

export default {
  name: "app",
  components: {
    graphVue: GraphVue,
    mapVue: MapVue
  },
  methods: {
    handler() {
      var args = arguments;
      for (var arg of args) {
        if (arg instanceof Function) {
          arg()
        }
      }
    },
    plot() {
      this.$refs.graph.dataPlot()
      this.$refs.map.plotLine()
    }
  }
}
</script>
