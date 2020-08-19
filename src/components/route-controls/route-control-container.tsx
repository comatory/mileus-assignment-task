import React, { useContext } from 'react'

import Context from '../context'
import { useRoutes, useRouteRequest }  from '../../hooks/storage/route'
import RouteInputContainer from './route-input-container'
import RouteUtils from '../../utils/route-utils'
import ErrorPanel from '../core/error-panel'

const RouteControlContainer = () => {
  const { mapManager } = useContext(Context)
  const { origin, destination } = useRoutes()
  const { pending, requestError } = useRouteRequest()

  const handleOriginInputBlur = (value: string, validity: boolean) => {
    if (!validity) {
      return
    }
    const lngLat = RouteUtils.convertStringToLngLat(value)

    mapManager.addOriginMarker(lngLat, true)
  }

  const handleOriginInputSubmit = (value: string) => {
    const lngLat = RouteUtils.convertStringToLngLat(value)

    mapManager.addOriginMarker(lngLat, true)
  }
  const handleDestinationInputSubmit = (value: string) => {
    const lngLat = RouteUtils.convertStringToLngLat(value)

    mapManager.addDestinationMarker(lngLat, true)
  }

  const handleDestinationInputBlur = (value: string, validity: boolean) => {
    if (!validity) {
      return
    }
    const lngLat = RouteUtils.convertStringToLngLat(value)

    mapManager.addDestinationMarker(lngLat, true)
  }

  const handleClearOriginInputButton = () => {
    mapManager.removeOriginMarker()

  }

  const handleClearDestinationInputButton = () => {
    mapManager.removeDestinationMarker()
  }

  const handleSubmit = (originString: string, destinationString: string) => {
    const originFromString = RouteUtils.convertStringToLngLat(originString)
    const destinationFromString = RouteUtils.convertStringToLngLat(destinationString)
    const originUpdated = origin && !RouteUtils.doesLngLatObjectsEqual(originFromString, origin)
    const destinationUpdated = destination && !RouteUtils.doesLngLatObjectsEqual(destinationFromString, destination)
    const nextOrigin = originUpdated ? originFromString : origin
    const nextDestination = destinationUpdated ? destinationFromString : destination

    if (originUpdated) {
      mapManager.removeOriginMarker()
      mapManager.addOriginMarker(nextOrigin)
    }

    if (destinationUpdated) {
      mapManager.removeDestinationMarker()
      mapManager.addDestinationMarker(nextDestination)
    }

    mapManager.findRoute(nextOrigin, nextDestination)
  }

  const handleOriginFocusButtonClick = () => {
    mapManager.moveToOrigin()
  }
  const handleDestinationFocusButtonClick = () => {
    mapManager.moveToDestination()
  }

  return (
    <div className='route-control-container'>
      <RouteInputContainer
        origin={origin}
        destination={destination}
        disabled={pending}
        onOriginSubmit={handleOriginInputSubmit}
        onOriginInputBlur={handleOriginInputBlur}
        onDestinationSubmit={handleDestinationInputSubmit}
        onDestinationInputBlur={handleDestinationInputBlur}
        onOriginClearButtonClick={handleClearOriginInputButton}
        onDestinationClearButtonClick={handleClearDestinationInputButton}
        onOriginFocusButtonClick={handleOriginFocusButtonClick}
        onDestinationFocusButtonClick={handleDestinationFocusButtonClick}
        onSubmit={handleSubmit}
      />
      {requestError && <ErrorPanel error={requestError} />}
    </div>
  )
}

export default RouteControlContainer
