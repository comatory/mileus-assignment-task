import { LngLat } from 'mapbox-gl'
import EventEmitter from 'events'

import { Route, Leg } from '../../interfaces/route'
import { IRouteStore } from '../../interfaces/stores'
import { ACTIVE_LEG, ACTIVE_ROUTE } from '../../constants'

const DEFAULT_EMPTY_ROUTES_IN_TEST: Array<Route> = []

export default class MockRouteStore implements IRouteStore {
  private _origin: LngLat | null = null
  private _destination: LngLat | null = null
  private _routeRequestPending: boolean = false
  private _routeRequestError: Error | null = null
  private _routes: Array<Route> = DEFAULT_EMPTY_ROUTES_IN_TEST

  private _emitter: EventEmitter = new EventEmitter()

  getOrigin(): LngLat | null {
    return this._origin
  }

  getDestination(): LngLat | null {
    return this._destination
  }

  isRouteRequestPending(): boolean {
    return this._routeRequestPending
  }

  getRouteRequestError(): Error | null {
    return this._routeRequestError
  }

  getRoutes(): Array<Route> {
    return this._routes
  }

  addListener = (callback: () => void) => {
    this._emitter.addListener('change', callback)

    return {
      remove: () => this.remove(callback)
    }
  }

  getActiveLeg(): Leg | null {
    const route = this.getRoutes()[ACTIVE_ROUTE]
    const leg = route ? route.legs[ACTIVE_LEG] : null

    return leg
  }

  remove = (callback: () => void) => {
    this._emitter.removeListener('change', callback)
  }

  private _emitChange() {
    this._emitter.emit('change')
  }

  setOriginInTest(origin: LngLat) {
    this._origin = origin
    this._emitChange()
  }

  setDestinationInTest(destination: LngLat) {
    this._destination = destination
    this._emitChange()
  }

  setRouteRequestPendingInTest(pending: boolean) {
    this._routeRequestPending = pending
    this._emitChange()
  }

  setRouteRequestErrorInTest(error: Error) {
    this._routeRequestError = error
    this._emitChange()
  }

  setRoutesInTest(routes: Array<Route>) {
    this._routes = routes
    this._emitChange()
  }
}

