import React, { useContext } from 'react'

import Context from '../context'
import { useRoutes }  from '../../hooks/storage/route'
import RouteForm from './route-form'
import RouteUtils from '../../utils/route-utils'

const RouteControlContainer = () => {
  const { mapManager, routeActions } = useContext(Context)
  const { origin, destination } = useRoutes()

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

    routeActions.setOrigin(lngLat)
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
    console.info('submission')
  }

  return (
    <div className='route-control-container'>
      <RouteForm
        origin={origin}
        destination={destination}
        onOriginInputBlur={handleOriginInputBlur}
        onDestinationInputBlur={handleDestinationInputBlur}
        onOriginClearButtonClick={handleClearOriginInputButton}
        onDestinationClearButtonClick={handleClearDestinationInputButton}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default RouteControlContainer
