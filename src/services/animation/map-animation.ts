import { Map } from 'mapbox-gl'
import { AnimationPayload } from '../../interfaces/animation'
import { GeometryCoordinate } from '../../interfaces/route'
import RouteUtils from '../../utils/route-utils'

export default class MapAnimation {
  private _map: Map
  private _distanceAccumulator: number = 0
  private _prevCoordinates: GeometryCoordinate | null = null

  constructor(map: Map, initialCoord: GeometryCoordinate) {
    this._map = map

    this._initializePoint(map, initialCoord)
    this._prevCoordinates = initialCoord
  }

  public update = (data: AnimationPayload) => {
    const { coordinates, nextCoordinates, duration, distance, paintDelta } = data
    const map = this._map
    const point = map.getSource('point')

    if (!point) {
      this._initializePoint(map, data.coordinates)
    }

    const distanceStep = (distance / duration) * paintDelta

    if (
      this._prevCoordinates &&
      coordinates[0] !== this._prevCoordinates[0] &&
      coordinates[1] !== this._prevCoordinates[1]
    ) {
      this._distanceAccumulator = 0
      this._prevCoordinates = coordinates
    }

    this._distanceAccumulator += distanceStep

    console.info(`${this._distanceAccumulator} / ${distance}`)
    const animatedPoint = RouteUtils.getPointOnGeoLine(coordinates, nextCoordinates || coordinates, this._distanceAccumulator)
    console.log(animatedPoint)

    this._map
      .getSource('point')
      // @ts-ignore
      .setData(animatedPoint)
  }

  public reset = () => {
    const point = this._map.getSource('point')

    if (!point) {
      return
    }

    this._map.removeLayer('point')
    this._map.removeSource('point')

    this._prevCoordinates = null
    this._distanceAccumulator = 0
  }

  private _initializePoint(map: Map, coordinates: GeometryCoordinate) {
    this._createDataSource(map, coordinates)
    this._createPoint(map)
  }

  private _createDataSource(map: Map, coordinates: GeometryCoordinate) {
    // @ts-ignore
    map.addSource('point', {
      type: 'geojson',
      data: {
        type: 'Point',
        coordinates,
      },
    })
  }

  private _createPoint(map: Map) {
    // @ts-ignore
    map.addLayer({
      id: 'point',
      source: 'point',
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf',
      }
    })
  }
}
