import React, { useEffect, useState, useCallback } from 'react'
import { LngLat } from 'mapbox-gl'

import RouteInput from './route-input'
import Button from '../core/button'
import RouteUtils from '../../utils/route-utils'
import ValidationUtils from '../../utils/validation-utils'

interface Props {
  origin: LngLat | null,
  destination: LngLat | null,
  disabled: boolean,
  onSubmit: (originString: string, destinationString: string) => void,
  onReset: () => void,
  onOriginSubmit: (value: string) => void,
  onDestinationSubmit: (value: string) => void,
  onOriginInputBlur: (value: string, validity: boolean) => void,
  onDestinationInputBlur: (value: string, validity: boolean) => void,
  onOriginClearButtonClick: () => void,
  onDestinationClearButtonClick: () => void,
  onOriginFocusButtonClick: () => void,
  onDestinationFocusButtonClick: () => void,
}

const RouteForm = (props: Props) => {
  const defaultOriginStringValue = props.origin ? RouteUtils.convertLngLatToString(props.origin) : ''
  const defaultDestinationStringValue = props.destination ? RouteUtils.convertLngLatToString(props.destination) : ''

  const [ originString, setOriginString ] = useState(defaultOriginStringValue)
  const [ destinationString, setDestinationString ] = useState(defaultDestinationStringValue)
  const [ formValidity, setFormValidity ] = useState({ origin: false, destination: false })

  const { origin, destination, onSubmit } = props

  useEffect(() => {
    const nextOriginString = origin ? RouteUtils.convertLngLatToString(origin) : ''
    const nextDestinationString = destination ? RouteUtils.convertLngLatToString(destination) : ''

    setOriginString(nextOriginString)
    setDestinationString(nextDestinationString)

    setFormValidity((prevFormValidity) => {
      return {
        ...prevFormValidity,
        origin: ValidationUtils.validateLatLngString(nextOriginString),
        destination: ValidationUtils.validateLatLngString(nextDestinationString),
      }
    })
  }, [ origin, destination ])

  const handleSubmission = useCallback(() => {
    onSubmit(originString, destinationString)
  },[ originString, destinationString, onSubmit ])

  const handleOriginSubmit = (value: string) => {
    setOriginString(value)
    props.onOriginSubmit(value)
  }

  const handleDestinationSubmit = (value: string) => {
    setOriginString(value)
    props.onDestinationSubmit(value)
  }

  const handleInputOriginBlur = (value: string) => {
    const nextValidity = ValidationUtils.validateLatLngString(value)
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, origin: nextValidity }))

    props.onOriginInputBlur(value, nextValidity)
  }

  const handleInputDestinationBlur = (value: string) => {
    const nextValidity = ValidationUtils.validateLatLngString(value)
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, destination: nextValidity }))

    props.onDestinationInputBlur(value, nextValidity)
  }

  const handleClearOriginInputButton = () => {
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, origin: false }))
    setOriginString('')

    props.onOriginClearButtonClick()
  }
  const handleClearDestinationInputButton = () => {
    setDestinationString('')
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, destination: false }))

    props.onDestinationClearButtonClick()
  }

  return (
    <>
      <div className='route-input-container__group'>
        <RouteInput
          id='origin'
          label='From'
          value={originString}
          disabled={props.disabled}
          onBlur={handleInputOriginBlur}
          onSubmit={handleOriginSubmit}
        />
        <Button
          onClick={handleClearOriginInputButton}
          label='×'
          disabled={props.disabled}
          className='route-input-container--clear-btn'
        />
        <Button
          onClick={props.onOriginFocusButtonClick}
          label='⊚'
          disabled={props.disabled}
          className='route-input-container--focus-btn'
        />
      </div>
      <div className='route-input-container__group'>
        <RouteInput
          id='destination'
          label='To'
          value={destinationString}
          disabled={props.disabled}
          onBlur={handleInputDestinationBlur}
          onSubmit={handleDestinationSubmit}
        />
        <Button
          onClick={handleClearDestinationInputButton}
          label='×'
          disabled={props.disabled}
          className='route-input-container--clear-btn'
        />
        <Button
          onClick={props.onDestinationFocusButtonClick}
          label='⊚'
          disabled={props.disabled}
          className='route-input-container--focus-btn'
        />
      </div>
      <div className='route-input-container__main-controls'>
        <Button
          type='primary'
          className='route-input-container__reset-btn'
          label='Reset'
          disabled={props.disabled}
          onClick={props.onReset}
        />
        <Button
          type='primary'
          htmlType='submit'
          label='Search'
          disabled={props.disabled || (!formValidity.origin || !formValidity.destination)}
          onClick={handleSubmission}
        />
      </div>
    </>
  )
}

export default RouteForm
