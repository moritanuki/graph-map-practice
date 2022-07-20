<template>
 <div class="mapVue">
    <h3>Map</h3>
    <button @click="plotLine">Plot Line</button>
    <div id="map"></div>
 </div>
</template>

<script>
    // OpenLayersのライブラリ
    import Map from 'ol/Map'
    import View from 'ol/View'
    import TileLayer from 'ol/layer/Tile'
    import Feature from 'ol/Feature'
    import {LineString, Point} from 'ol/geom'
    import {OSM, Vector as VectorSource} from 'ol/source'
    import {Vector as VectorLayer} from 'ol/layer'

    // 描画情報
    // import shipData1 from '../assets/json/ship-data1.json'

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

                // ラインを生成
                const lineFeature = new Feature(
                    new LineString([
                        [0, 0],
                        [0, 3e6]
                    ])
                )

                // 図形生成
                const vector = new VectorLayer({
                    source: new VectorSource({
                        features: [pointFeature, lineFeature]
                    })
                })

                // 地図に描画
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