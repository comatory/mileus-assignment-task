import React, { useState, useContext, useCallback } from 'react'

import RouteInput from './route-input'
import Button from '../core/button'
import Context from '../context'
import { useRoutes }  from '../../hooks/storage/route'
import RouteUtils from '../../utils/route-utils'

const RouteControlContainer = () => {
  const { routeActions } = useContext(Context)
  const { origin, destination } = useRoutes()

  const [ originString, setOriginString ] = useState(RouteUtils.convertLngLatToString(origin))
  const [ destinationString, setDestinationString ] = useState(RouteUtils.convertLngLatToString(destination))

  const [ formValidity, setFormValidity ] = useState({ origin: false, destination: false })

  const handleOriginInputChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>, _id: string, validity: boolean) => {
    setOriginString(e.currentTarget.value)
  }, [ origin, formValidity ])
  const handleDestinationInputChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>, _id: string, validity: boolean) => {
    setDestinationString(e.currentTarget.value)
  }, [ destination, formValidity ])
  const handleInputOriginBlur = useCallback((e: React.SyntheticEvent<HTMLInputElement>, _id: string, validity: boolean) => {
    const nextValidity = validity
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, origin: nextValidity }))

    if (!nextValidity) {
      return
    }
    const lngLat = RouteUtils.convertStringToLngLat(e.currentTarget.value)

    routeActions.setOrigin(lngLat)
  }, [ origin ])
  const handleInputDestinationBlur = useCallback((e: React.SyntheticEvent<HTMLInputElement>, _id: string, validity: boolean) => {
    const nextValidity = validity
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, destination: nextValidity }))

    if (!nextValidity) {
      return
    }
    const lngLat = RouteUtils.convertStringToLngLat(e.currentTarget.value)

    routeActions.setDestination(lngLat)
  }, [ destination ])
  const handleClearOriginInputButton = useCallback(() => {
    routeActions.clearOrigin()
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, origin: false }))
    setOriginString('')
  }, [ origin ])
  const handleClearDestinationInputButton = useCallback(() => {
    routeActions.clearDestination()
    setDestinationString('')
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, destination: false }))
  }, [ destination ])
  const handleRouteFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.info('submit now')
  }, [ origin, destination ])

  return (
    <div className='route-control-container'>
      <form onSubmit={handleRouteFormSubmit}>
        <div className='route-control-container__group'>
          <RouteInput
            id='origin'
            label='From'
            value={originString}
            onChange={handleOriginInputChange}
            onBlur={handleInputOriginBlur}
          />
          <Button
            onClick={handleClearOriginInputButton}
            label='∅'
            className='route-control-container--clear-btn'
          />
        </div>
        <div className='route-control-container__group'>
          <RouteInput
            id='destination'
            label='To'
            value={destinationString}
            onChange={handleDestinationInputChange}
            onBlur={handleInputDestinationBlur}
          />
          <Button
            onClick={handleClearDestinationInputButton}
            label='∅'
            className='route-control-container--clear-btn'
          />
        </div>
        <Button
          type='primary'
          htmlType='submit'
          label='Search'
          disabled={!formValidity.origin || !formValidity.destination}
        />
      </form>
    </div>
  )
}

export default RouteControlContainer
