<template>
  <div id="app">
    <graphVue></graphVue>
    <mapVue></mapVue>
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
    }
  }
}
</script>
