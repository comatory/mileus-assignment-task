import * as React from 'react'
import { LngLat } from 'mapbox-gl'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { RootState } from './state'
import { Services } from './services'
import { Route } from './route'
import {
  CONFIG_ACTIONS_TYPES,
  SetConfigPropertyAction,
} from '../services/actions/config'
import {
  ROUTE_ACTIONS_TYPES,
  SetOriginAction,
  SetDestinationAction,
  ClearOriginAction,
  ClearDestinationAction,
  SetRouteRequestAction,
  SetRouteRequestFinishedAction,
  SetRouteRequestErrorAction,
  ClearRouteRequestErrorAction,
  SetRoutesAction,
  ClearRoutesAction,
} from '../services/actions/route'
import {
  GRAPH_ACTION_TYPES,
  SetGraphAnimationMultiplicationAction,
  ClearGraphDataAction,
} from '../services/actions/graph'
import {
  MAP_ACTION_TYPES
} from '../services/actions/map'

export type ActionType = (
  keyof typeof CONFIG_ACTIONS_TYPES |
  keyof typeof ROUTE_ACTIONS_TYPES |
  keyof typeof GRAPH_ACTION_TYPES |
  keyof typeof MAP_ACTION_TYPES
)

export interface Action {
  type: ActionType,
  data: { [key: string]: any },
}

export type ThunkResult = (
  dispatch: ThunkDispatch<RootState, Services, AnyAction>,
  getState: () => RootState,
  services: Services
) => void

export interface IConfigActions {
  setProperty: (key: string, property: any) => SetConfigPropertyAction,
}

export interface IRouteActions {
  setOrigin: (origin: LngLat) => SetOriginAction,
  setDestination: (destination: LngLat) => SetDestinationAction,
  clearOrigin: () => ClearOriginAction,
  clearDestination: () => ClearDestinationAction,
  startRouteRequest: () => SetRouteRequestAction,
  stopRouteRequest: () => SetRouteRequestFinishedAction,
  setRouteRequestError: (error: Error) => SetRouteRequestErrorAction,
  clearRouteRequestError: () => ClearRouteRequestErrorAction,
  setRoutes: (routes: Array<Route>) => SetRoutesAction,
  clearRoutes: () => ClearRoutesAction,
}

export interface IMapActions {
  initialize: (token: string | null) => void,
  createMap: (node: HTMLElement) => ThunkResult,
  removeMap: () => ThunkResult,
  addOriginMarker: (lngLat: LngLat, moveMap?: boolean) => ThunkResult
  addDestinationMarker: (lngLat: LngLat, moveMap?: boolean) => ThunkResult
  findRoute: (origin: LngLat, destination: LngLat) => ThunkResult,
  moveToOrigin: () => ThunkResult,
  moveToDestination: () => ThunkResult,
  removeOriginMarker: () => ThunkResult,
  removeDestinationMarker: () => ThunkResult,
  removeMarkers: () => ThunkResult,
}

export interface IGraphActions {
  registerPlayerGraphCanvas: (ref: React.RefObject<HTMLCanvasElement> | null) => ThunkResult,
  unregisterPlayerGraphCanvas: () => ThunkResult,
  setMultiplication: (multiplication: number) => SetGraphAnimationMultiplicationAction,
  play: () => ThunkResult,
  stop: () => ThunkResult,
  pause: () => ThunkResult,
  reset: () => ThunkResult,
  clearData: () => ClearGraphDataAction,
}
