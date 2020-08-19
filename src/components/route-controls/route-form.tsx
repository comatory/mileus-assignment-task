import React, { useCallback, useEffect, useState } from 'react'
import { LngLat } from 'mapbox-gl'

import RouteInput from './route-input'
import Button from '../core/button'
import RouteUtils from '../../utils/route-utils'
import ValidationUtils from '../../utils/validation-utils'

interface Props {
  origin: LngLat | null,
  destination: LngLat | null,
  disabled: boolean,
  onSubmit: () => void,
  onOriginInputBlur: (value: string, validity: boolean) => void,
  onDestinationInputBlur: (value: string, validity: boolean) => void,
  onOriginClearButtonClick: () => void,
  onDestinationClearButtonClick: () => void,
}

const RouteForm = (props: Props) => {
  const defaultOriginStringValue = props.origin ? RouteUtils.convertLngLatToString(props.origin) : ''
  const defaultDestinationStringValue = props.destination ? RouteUtils.convertLngLatToString(props.destination) : ''

  const [ originString, setOriginString ] = useState(defaultOriginStringValue)
  const [ destinationString, setDestinationString ] = useState(defaultDestinationStringValue)
  const [ formValidity, setFormValidity ] = useState({ origin: false, destination: false })

  useEffect(() => {
    const nextOriginString = props.origin ? RouteUtils.convertLngLatToString(props.origin) : originString
    const nextDestinationString: string = props.destination ? RouteUtils.convertLngLatToString(props.destination) : destinationString
    setOriginString(nextOriginString)
    setDestinationString(nextDestinationString)
    setFormValidity((prevFormValidity) => {
      return {
        ...prevFormValidity,
        origin: ValidationUtils.validateLatLngString(nextOriginString),
        destination: ValidationUtils.validateLatLngString(nextDestinationString),
      }
    })
  }, [ props.origin, props.destination ])

  const handleRouteFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    props.onSubmit()
  }, [ props.origin, props.destination ])

  const handleOriginInputChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>, _id: string, _validity: boolean) => {
    setOriginString(e.currentTarget.value)
  }, [ originString, formValidity ])

  const handleDestinationInputChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>, _id: string, _validity: boolean) => {
    setDestinationString(e.currentTarget.value)
  }, [ destinationString, formValidity ])

  const handleInputOriginBlur = useCallback((e: React.SyntheticEvent<HTMLInputElement>, id: string, validity: boolean) => {
    const nextValidity = validity
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, origin: nextValidity }))

    props.onOriginInputBlur(e.currentTarget.value, nextValidity)
  }, [ originString ])

  const handleInputDestinationBlur = useCallback((e: React.SyntheticEvent<HTMLInputElement>, _id: string, validity: boolean) => {
    const nextValidity = validity
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, destination: nextValidity }))

    props.onDestinationInputBlur(e.currentTarget.value, nextValidity)
  }, [ destinationString ])

  const handleClearOriginInputButton = useCallback(() => {
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, origin: false }))
    setOriginString('')

    props.onOriginClearButtonClick()
  }, [ originString ])
  const handleClearDestinationInputButton = useCallback(() => {
    setDestinationString('')
    setFormValidity((prevFormValidity) => ({ ...prevFormValidity, destination: false }))

    props.onDestinationClearButtonClick()
  }, [ destinationString ])

  return (
    <form
      className='route-form'
      onSubmit={handleRouteFormSubmit}>
      <div className='route-control-container__group'>
        <RouteInput
          id='origin'
          label='From'
          value={originString}
          disabled={props.disabled}
          onChange={handleOriginInputChange}
          onBlur={handleInputOriginBlur}
        />
        <Button
          onClick={handleClearOriginInputButton}
          label='∅'
          disabled={props.disabled}
          className='route-control-container--clear-btn'
        />
      </div>
      <div className='route-control-container__group'>
        <RouteInput
          id='destination'
          label='To'
          value={destinationString}
          disabled={props.disabled}
          onChange={handleDestinationInputChange}
          onBlur={handleInputDestinationBlur}
        />
        <Button
          onClick={handleClearDestinationInputButton}
          label='∅'
          disabled={props.disabled}
          className='route-control-container--clear-btn'
        />
      </div>
      <Button
        type='primary'
        htmlType='submit'
        label='Search'
        disabled={props.disabled || (!formValidity.origin || !formValidity.destination)}
      />
    </form>
  )
}

export default RouteForm
