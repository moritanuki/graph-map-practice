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
    import {Icon, Style} from 'ol/style'

    // 描画情報
    import shipData1 from '../assets/json/ship-data1.json'
    import ship from '../assets/img/ship.png'
    import shipBlue from '../assets/img/ship_blue.png'

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
            createPoints() {
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
                        LONDEGMIN = 360 - LONDEGMIN
                    }
                    if(LATNS === 'S') {
                        //pass
                    }

                    points.push([LONDEGMIN, LATDEGMIN] )
                })

                return points
            },
            generateFeatures(points, featureType) {
                // 図形クラス生成
                // featureType: 'Point', 'LineString'

                let features = []

                switch(featureType) {
                    case 'Point': {
                        points.forEach((data) => {
                            features.push(
                                new Feature(
                                    new Point(data)
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
                                        new LineString([pre, data])
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
            calculateDirection(startPoint, finishPoint) {
                // 船の方角計算
                let radian = Math.atan2(
                    finishPoint[1] - startPoint[1],
                    finishPoint[0] - startPoint[0]
                )

                if(radian < 0) {
                    radian += 1
                }

                return radian
            },
            plotLine() {

                const points = this.createPoints()
                const len = points.length
                const startPoint = points[0]
                const finishPoint = points[len-1]
                
                const pointFeatures = this.generateFeatures(points, 'Point')
                const lineFeatures = this.generateFeatures(points, 'LineString')
                const shipFeature = this.generateFeatures([startPoint], 'Point')
                const shipBlueFeature = this.generateFeatures([finishPoint], 'Point')
                
                // 図形生成
                const vector = new VectorLayer({
                    source: new VectorSource({
                        features: [...pointFeatures, ...lineFeatures]
                    }),
                })

                const shipDirection = this.calculateDirection(startPoint, points[1])
                const shipBlueDirection = this.calculateDirection(points[len-2], finishPoint)
                console.log(shipBlueDirection)

                // 始点を船アイコンで描画
                const vectorShip = new VectorLayer({
                    source: new VectorSource({
                        features: shipFeature
                    }),
                    style: new Style({
                        image: new Icon({
                            src: ship,
                            rotation: shipDirection
                        })
                    })
                })

                // 終点を青い船アイコンで描画
                const vectorShipBlue = new VectorLayer({
                    source: new VectorSource({
                        features: shipBlueFeature
                    }),
                    style: new Style({
                        image: new Icon({
                            src: shipBlue,
                            rotation: shipBlueDirection
                        })
                    })
                })

                // 地図に描画
                this.map.addLayer(vector)
                this.map.addLayer(vectorShip)
                this.map.addLayer(vectorShipBlue)
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