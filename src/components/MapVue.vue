<template>
 <div class="mapVue">
    <h3>Map</h3>
    <button @click="plotLine">Plot Line</button>
    <div id="map"></div>
 </div>
</template>

<script>
    import Map from 'ol/Map'
    import View from 'ol/View'
    import TileLayer from 'ol/layer/Tile'
    import Feature from 'ol/Feature'
    import {Point} from 'ol/geom'
    import {OSM, Vector as VectorSource} from 'ol/source'
    import {Vector as VectorLayer} from 'ol/layer'

    export default {
        name: 'mapVue',
        data() {
            return {
                map: new Map()
            }
        },
        mounted() {
            this.mapCreate()
        },
        methods: {
            mapCreate() {
                // 地図を描画
                this.map = new Map({
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
            },
            plotLine() {
                // ポイントを生成
                const pointFeature = new Feature(new Point([0, 0]))

                // ラインを描画
                const vector = new VectorLayer({
                    source: new VectorSource({
                        features: [pointFeature]
                    })
                })

                this.map.addLayer(vector)
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