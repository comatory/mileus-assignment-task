import * as sinon from 'sinon'
import * as reactRedux from 'react-redux'
import * as React from 'react'

import {
  Geometry,
  GeometryCoordinate,
  Leg,
  Route,
} from '../interfaces/route'
import { RootState } from '../interfaces/state'
import { initialState as configInitialState } from '../reducers/config-reducer'
import { initialState as graphInitialState } from '../reducers/graph-reducer'
import { initialState as mapInitialState } from '../reducers/map-reducer'
import { initialState as routeInitialState } from '../reducers/route-reducer'
import ioc from '../ioc'
import { Services } from '../interfaces/services'

export default class TestUtils {
  static getRandomFloatNumber(acc: number = 10): number {
    return Math.random() * acc
  }

  static getRandomNumber(acc: number = 10): number {
    return Math.ceil(TestUtils.getRandomFloatNumber(acc))
  }

  static getRandomFloatRange(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  static getRandomRange(min: number, max: number): number {
    const roundedMin = Math.ceil(min)
    const roundedMax = Math.floor(max)
    return Math.random() * (roundedMax - roundedMin) + roundedMin
  }

  static getRandomString(): string {
    return  [
      TestUtils.getRandomStringPart(),
      TestUtils.getRandomStringPart(),
    ].join('')
  }

  static getRandomStringPart(): string {
    return Math.random().toString(36).substring(2, 15)
  }

  static createRoute(properties: Partial<Route> = {}): Route {
    return {
      distance: TestUtils.getRandomFloatNumber(),
      duration: TestUtils.getRandomFloatNumber(),
      weight: TestUtils.getRandomFloatNumber(),
      weight_name: TestUtils.getRandomString(),
      geometry: TestUtils.getRandomGeometry(properties.geometry),
      legs: [ TestUtils.getRandomLeg() ],
      ...properties,
    }
  }

  static getRandomGeometry(properties: Partial<Geometry> = {}): Geometry {
    return {
      coordinates: [ TestUtils.getRandomCoordinate() ],
      type: TestUtils.getRandomString(),
      ...properties,
    }
  }

  static getRandomCoordinate(): GeometryCoordinate {
    return [
      TestUtils.getRandomFloatRange(-180, 80), // Longitude
      TestUtils.getRandomFloatRange(-90, 90), // Latitude
    ]
  }

  static getRandomLeg(properties: Partial<Leg> = {}): Leg {
    const iterationCount = TestUtils.getRandomRange(1, 5)
    const iteration = Array.from({ length: iterationCount }, (_x, i) => i)

    const distance = iteration.map(() => TestUtils.getRandomFloatNumber())
    const duration = iteration.map(() => TestUtils.getRandomFloatNumber())
    const speed = iteration.map(() => TestUtils.getRandomFloatNumber())
    const totalDistance = distance.reduce((acc, distance) => acc += distance, 0)
    const totalDuration = duration.reduce((acc, duration) => acc += duration, 0)

    return {
      annotation: {
        distance,
        duration,
        speed,
      },
      distance: totalDistance,
      duration: totalDuration,
      steps: [],
      summary: TestUtils.getRandomString(),
      weight: TestUtils.getRandomFloatNumber(),
      ...properties,
    }
  }

  static mockDispatch(spy: sinon.SinonSpy) {
    return sinon.stub(reactRedux, 'useDispatch').returns(spy)
  }

  static mockSelector(state: any = {}) {
    return sinon.stub(reactRedux, 'useSelector').returns(state)
  }

  static mockContext(context: Partial<Services> = {}) {
    return sinon.stub(React, 'useContext').returns({
      ...ioc,
      ...context,
    })
  }

  static resetMock(mock: sinon.SinonStub<any>) {
    mock.restore()
  }

  static createRootState(state: Partial<RootState> = {}): RootState {
    return {
      route: routeInitialState,
      map: mapInitialState,
      config: configInitialState,
      graph: graphInitialState,
      ...state,
    }
  }
}
