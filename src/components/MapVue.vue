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
    // import {Point} from 'ol/geom'
    import {LineString, Point} from 'ol/geom'
    import {OSM, Vector as VectorSource} from 'ol/source'
    import {Vector as VectorLayer} from 'ol/layer'

    // 描画情報
    import shipData1 from '../assets/json/ship-data1.json'

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
                        projection: 'EPSG:4326',
                        center: [139.0915, 35.1878],
                        zoom: 2,
                    })
                })
            },
            createPoint() {
                // ポイントを生成
                let points = []

                shipData1.SpasDailyData.forEach((data) => {
                    let LONDEGMIN = data.LONDEGMIN //経度
                    const LONEW = data.LONEW
                    let LATDEGMIN = data.LATDEGMIN //緯度
                    const LATNS = data.LATNS

                    // null値除外
                    if(LATDEGMIN == null || LONDEGMIN == null) {
                        return
                    }

                    // 方角による表記変換
                    if(LONEW === 'W') {
                        LONDEGMIN = -(LONDEGMIN)
                    }
                    if(LATNS === 'S') {
                        LATDEGMIN = -(LATDEGMIN)
                    }

                    points.push([LONDEGMIN, LATDEGMIN] )
                })

                return points
            },
            generateFeatures(points, featureType) {
                let features = []

                switch(featureType) {
                    case 'Point': {
                        points.forEach((data) => {
                            features.push(
                                new Feature(
                                    new Point(
                                    data
                                    )
                                )
                            )
                        })
                    }
                        break
                    case 'LineString': {
                        let pre = []

                        points.forEach((data, index) => {
                            if(index !== 0 || index % 2 !== 0) {
                                features.push(
                                    new Feature(
                                        new LineString([
                                            pre,
                                            data
                                        ])
                                    )
                                )
                            }
                            pre = data
                        })
                    }
                        break
                }

                return features
            },
            plotLine() {

                const points = this.createPoint()
                
                const pointFeatures = this.generateFeatures(points, 'Point')
                const lineFeatures = this.generateFeatures(points, 'LineString')

                // 図形生成
                const vector = new VectorLayer({
                    source: new VectorSource({
                        features: [...pointFeatures, ...lineFeatures]
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