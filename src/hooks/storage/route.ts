import { useState, useEffect, useContext } from 'react'
import { LngLat } from 'mapbox-gl'

import Context from '../../components/context'

interface Routes {
  origin: LngLat | null,
  destination: LngLat | null,
}

export const useRoutes = (): Routes => {
  const { routeStore } = useContext(Context)
  const [ origin, setOrigin ] = useState(routeStore.getOrigin())
  const [ destination, setDestination ] = useState(routeStore.getDestination())

  const handleRouteStoreChange = () => {
    setOrigin(routeStore.getOrigin())
    setDestination(routeStore.getDestination())
  }

  useEffect(() => {
    const subscriber = routeStore.addListener(handleRouteStoreChange)

    return () => subscriber.remove()
  })

  return { origin, destination }
}

interface RouteRequestState {
  pending: boolean,
  requestError: Error | null,
}

export const useRouteRequest = (): RouteRequestState => {
  const { routeStore } = useContext(Context)
  const [ pending, setPending ] = useState(routeStore.isRouteRequestPending())
  const [ requestError, setRequestError ] = useState(routeStore.getRouteRequestError())

  const handleRouteStoreChange = () => {
    setPending(routeStore.isRouteRequestPending())
    setRequestError(routeStore.getRouteRequestError())
  }

  useEffect(() => {
    const subscriber = routeStore.addListener(handleRouteStoreChange)

    return () => subscriber.remove()
  })

  return { pending, requestError }
}
