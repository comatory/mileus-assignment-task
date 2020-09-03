import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Context from '../context'
import RouteInputContainer from './route-input-container'
import RouteUtils from '../../utils/route-utils'
import ErrorPanel from '../core/error-panel'
import { RootState } from '../../interfaces/state'

const RouteControlContainer = () => {
  const dispatch = useDispatch()
  const { graphActions, mapActions } = React.useContext(Context)
  const {
    origin,
    destination,
    pending,
    requestError,
  } = useSelector((state: RootState) => {
    const { origin, destination, routeRequest, routeRequestError } = state.route

    return {
      origin,
      destination,
      pending: routeRequest,
      requestError: routeRequestError,
    }
  })

  const handleOriginInputSubmit = (value: string) => {
    const lngLat = RouteUtils.convertStringToLngLat(value)

    dispatch(mapActions.addOriginMarker(lngLat, true))
  }

  const handleDestinationInputSubmit = (value: string) => {
    const lngLat = RouteUtils.convertStringToLngLat(value)

    dispatch(mapActions.addDestinationMarker(lngLat, true))
  }

  const handleOriginInputBlur = (value: string, validity: boolean) => {
    if (!validity) {
      return
    }
    const lngLat = RouteUtils.convertStringToLngLat(value)

    dispatch(mapActions.addOriginMarker(lngLat, true))
  }

  const handleDestinationInputBlur = (value: string, validity: boolean) => {
    if (!validity) {
      return
    }
    const lngLat = RouteUtils.convertStringToLngLat(value)

    dispatch(mapActions.addDestinationMarker(lngLat, true))
  }

  const handleClearOriginInputButton = () => {
    dispatch(mapActions.removeOriginMarker())
    dispatch(graphActions.reset())
  }

  const handleClearDestinationInputButton = () => {
    dispatch(mapActions.removeDestinationMarker())
    dispatch(graphActions.reset())
  }

  const handleSubmit = (originString: string, destinationString: string) => {
    const originFromString = RouteUtils.convertStringToLngLat(originString)
    const destinationFromString = RouteUtils.convertStringToLngLat(destinationString)
    const originUpdated = !RouteUtils.doesLngLatObjectsEqual(originFromString, origin)
    const destinationUpdated = !RouteUtils.doesLngLatObjectsEqual(destinationFromString, destination)
    const nextOrigin = originUpdated ? originFromString : origin
    const nextDestination = destinationUpdated ? destinationFromString : destination

    if (originUpdated && nextOrigin) {
      dispatch(mapActions.addOriginMarker(nextOrigin))
    }

    if (destinationUpdated && nextDestination) {
      dispatch(mapActions.addDestinationMarker(nextDestination))
    }

    if (nextOrigin && nextDestination) {
      dispatch(mapActions.findRoute(nextOrigin, nextDestination))
    }
  }

  const handleReset = () => {
    dispatch(mapActions.removeMarkers())
    dispatch(graphActions.reset())
  }

  const handleOriginFocusButtonClick = () => {
    dispatch(mapActions.moveToOrigin())
  }
  const handleDestinationFocusButtonClick = () => {
    dispatch(mapActions.moveToDestination())
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
        onReset={handleReset}
      />
      {requestError && <ErrorPanel error={requestError} />}
    </div>
  )
}

export default RouteControlContainer
