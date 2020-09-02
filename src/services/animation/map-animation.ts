import { Map } from 'mapbox-gl'
import { AnimationPayload } from '../../interfaces/animation'
import { GeometryCoordinate } from '../../interfaces/route'

export default class MapAnimation {
  private _map: Map

  constructor(map: Map, initialCoord: GeometryCoordinate) {
    this._map = map

    this._initializePoint(map, initialCoord)
  }

  public update = (data: AnimationPayload) => {
    const { coordinates } = data
    const map = this._map
    const point = map.getSource('point')

    if (!point) {
      this._initializePoint(map, data.coordinates)
    }

    this._map
      .getSource('point')
      // @ts-ignore
      .setData({
        type: 'Point',
        coordinates,
      })
  }

  public reset = () => {
    const point = this._map.getSource('point')

    if (!point) {
      return
    }

    this._map.removeLayer('point')
    this._map.removeSource('point')
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
        // @ts-ignore
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
