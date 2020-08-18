import React, { useContext } from 'react'

import Context from '../context'
import { useRoutes, useRouteRequest }  from '../../hooks/storage/route'
import RouteForm from './route-form'
import RouteUtils from '../../utils/route-utils'
import ErrorPanel from '../core/error-panel'

const RouteControlContainer = () => {
  const { mapManager, routeActions } = useContext(Context)
  const { origin, destination } = useRoutes()
  const { pending, requestError } = useRouteRequest()

  const handleOriginInputBlur = (value: string, validity: boolean) => {
    if (!validity) {
      return
    }
    const lngLat = RouteUtils.convertStringToLngLat(value)

    routeActions.setOrigin(lngLat)
    mapManager.addOriginMarker(lngLat)
  }

  const handleDestinationInputBlur = (value: string, validity: boolean) => {
    if (!validity) {
      return
    }
    const lngLat = RouteUtils.convertStringToLngLat(value)

    routeActions.setDestination(lngLat)
    mapManager.addDestinationMarker(lngLat)
  }

  const handleClearOriginInputButton = () => {
    routeActions.clearOrigin()
    mapManager.removeOriginMarker()
  }

  const handleClearDestinationInputButton = () => {
    routeActions.clearDestination()
    mapManager.removeDestinationMarker()
  }

  const handleSubmit = () => {
    mapManager.findRoute(origin, destination)
  }

  return (
    <div className='route-control-container'>
      <RouteForm
        origin={origin}
        destination={destination}
        disabled={pending}
        onOriginInputBlur={handleOriginInputBlur}
        onDestinationInputBlur={handleDestinationInputBlur}
        onOriginClearButtonClick={handleClearOriginInputButton}
        onDestinationClearButtonClick={handleClearDestinationInputButton}
        onSubmit={handleSubmit}
      />
      {requestError && <ErrorPanel error={requestError} />}
    </div>
  )
}

export default RouteControlContainer
