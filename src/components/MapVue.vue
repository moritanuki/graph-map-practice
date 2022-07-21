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
    import shipData2 from '../assets/json/ship-data2.json'
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
            calculateMiddlePoint(x1, y1, x2, y2) {
                // y軸計算
                let x, y, a, b

                x = 180
                a = (y2 - y1) / (x2 - x1)
                b = y1 - a * x1
                y = a * x + b

                return y
            },
            createPoints(shipData) {
                // ポイントを生成
                let points = []
                let preLONEW = ''
                let preLONDEGMIN = ''
                let preLATDEGMIN = ''

                shipData.forEach((data) => {
                    let LONDEGMIN = data.LONDEGMIN //経度
                    const LONEW = data.LONEW
                    let LATDEGMIN = data.LATDEGMIN //緯度
                    const LATNS = data.LATNS

                    // null値除外
                    if(LATDEGMIN == null || LONDEGMIN == null) {
                        return
                    }

                    // 方角による表記変換
                    if(LATNS === 'S') {
                        LATDEGMIN =  -(LATDEGMIN)
                    }
                    if(LONEW === 'W') {
                        LONDEGMIN = 360 - LONDEGMIN
                    }

                    // 西経→東経
                    if(preLONEW === 'W' && LONEW === 'E') {
                        const y = this.calculateMiddlePoint(
                                preLONDEGMIN, preLATDEGMIN, LONDEGMIN, LATDEGMIN
                            )
                        points.push([360, y], [0, y])
                    }
                    preLONEW = LONEW
                    preLONDEGMIN = LONDEGMIN
                    preLATDEGMIN = LATDEGMIN

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

                                // 経線の不要ラインは除く
                                if(pre[0] !== 360) {
                                    features.push(
                                        new Feature(
                                            new LineString([pre, data])
                                        )
                                )
                                }
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
            generateVector(points) {
                // 点と線の図形生成
                const pointFeatures = this.generateFeatures(points, 'Point')
                const lineFeatures = this.generateFeatures(points, 'LineString')
                
                const vector = new VectorLayer({
                    source: new VectorSource({
                        features: [...pointFeatures, ...lineFeatures]
                    }),
                })

                return vector
            },
            generateShipVector(startPoint, finishPoint, shipImg) {
                // 船アイコンの生成
                const shipFeature = this.generateFeatures([startPoint], 'Point')

                // 船アイコンの角度調整
                const shipDirection = this.calculateDirection(startPoint, finishPoint)

                const vectorShip = new VectorLayer({
                    source: new VectorSource({
                        features: shipFeature
                    }),
                    style: new Style({
                        image: new Icon({
                            src: shipImg,
                            rotation: shipDirection
                        })
                    })
                })

                return vectorShip
            },
            plotLine() {
                // 地図に描画

                // ポイント
                const points1 = this.createPoints(shipData1.SpasDailyData)
                const startPoint1 = points1[0]
                const finishPoint1 = points1[points1.length-1]

                const points2 = this.createPoints(shipData2.NormalTrendData)
                const startPoint2 = points2[0]
                const finishPoint2 = points2[points2.length-1]

                //図形生成
                const vector1 = this.generateVector(points1)
                const vectorShip1 = this.generateShipVector(startPoint1, points1[1], ship)
                const vectorShipBlue1 = this.generateShipVector(points1[points1.length-2], finishPoint1, shipBlue)

                const vector2 = this.generateVector(points2)
                const vectorShip2 = this.generateShipVector(startPoint2, points2[1], ship)
                const vectorShipBlue2 = this.generateShipVector(points2[points2.length-2], finishPoint2, shipBlue)

                // 描画
                this.map.addLayer(vector1)
                this.map.addLayer(vectorShip1)
                this.map.addLayer(vectorShipBlue1)

                this.map.addLayer(vector2)
                this.map.addLayer(vectorShip2)
                this.map.addLayer(vectorShipBlue2)
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