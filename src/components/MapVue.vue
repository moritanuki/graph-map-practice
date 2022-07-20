<template>
 <div class="mapVue">
    <h3>Map</h3>
    <button>Plot Line</button>
    <div id="map"></div>
 </div>
</template>

<script>
    import Map from 'ol/Map'
    import OSM from 'ol/source/OSM'
    import View from 'ol/View'
    import TileLayer from 'ol/layer/Tile'

    export default {
        name: 'mapVue',
        mounted() {
            this.mapCreate()
        },
        methods: {
            mapCreate() {
                new Map({
                    target: 'map',
                    layers: [
                        new TileLayer({
                        source: new OSM(),
                        }),
                    ],
                    view: new View ({
                        center: [0, 0],
                        zoom: 2,
                    })
                })
            }
        }
    }
</script>

<style>
    #map {
      height: 400px;
      width: 100%;
    }
  </style>