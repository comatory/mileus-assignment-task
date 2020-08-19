import React, { useState, useCallback } from 'react'

import RouteInput from './route-input'
import Button from '../core/button'

const RouteControlContainer = () => {
  const [ origin, setOrigin ] = useState('')
  const [ destination, setDestination ] = useState('')
  const [ formValidity, setFormValidity ] = useState({ origin: false, destination: false })

  const handleOriginInputChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>, _id: string, validity: boolean) => {
    setOrigin(e.currentTarget.value)
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, origin: validity }))
  }, [ origin, formValidity ])
  const handleDestinationInputChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>, _id: string, validity: boolean) => {
    setDestination(e.currentTarget.value)
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, destination: validity }))
  }, [ destination, formValidity ])
  const handleClearOriginInputButton = useCallback(() => {
    setOrigin('')
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, origin: false }))
  }, [ origin ])
  const handleClearDestinationInputButton = useCallback(() => {
    setDestination('')
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
            value={origin}
            onChange={handleOriginInputChange}
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
            value={destination}
            onChange={handleDestinationInputChange}
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
