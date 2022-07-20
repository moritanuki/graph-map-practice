<template>
  <div id="app">
    <graphVue></graphVue>
  </div>
</template>

<script>
import GraphVue from "./components/GraphVue";

export default {
  name: "app",
  components: {
    graphVue: GraphVue
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
