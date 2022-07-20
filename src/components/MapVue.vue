<template>
 <div class="mapVue">
    <h3>Map</h3>
    <button @click="dataPlot">Plot Line</button>
    <div id="map"></div>
 </div>
</template>

<script>
    import Map from 'ol/Map'
    // import View from 'ol/View'
    // import TileLayer from 'ol/layer/Tile'
    // import XYZ from 'ol/source/XYZ'
    // import { fromLonLat } from 'ol/proj'

    export default {
        name: 'mapVue',
        mounted() {
            this.mapCreate()
        },
        methods: {
            mapCreate() {
                new Map({
                    target: 'map',
                })
            }
        }
    }
</script>

<style>
    .map {
      height: 400px;
      width: 100%;
    }
  </style>