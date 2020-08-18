import React, { useState, useCallback } from 'react'
import classNames from 'classnames'

import ValidationUtils from '../../utils/validation-utils'

interface Props {
  id: string,
  value: string,
  label: string,
  valid?: boolean,
  onChange: (e: React.SyntheticEvent<HTMLInputElement>, id: string, validity: boolean) => void,
  onBlur?: (e: React.SyntheticEvent<HTMLInputElement>, id: string, validity: boolean) => void,
  onFocus?: (e: React.SyntheticEvent<HTMLInputElement>) => void,
}

const RouteInput = (props: Props) => {
  const [ inputValid, setInputValidity ] = useState(false)
  const [ inputBlurred, setInputBlurred ] = useState(false)

  const handleInputBlur = useCallback((e: React.SyntheticEvent<HTMLInputElement>) => {
    const nextInputValidity = ValidationUtils.validateLatLngString(props.value)
    setInputBlurred(true)

    if (props.onBlur) {
      props.onBlur(e, props.id, nextInputValidity)
    }
  }, [ props.value ])
  const handleInputChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>) => {
    const nextInputValidity = ValidationUtils.validateLatLngString(props.value)
    setInputValidity(nextInputValidity)

    props.onChange(e, props.id, nextInputValidity)
  }, [ props.value ])

  const valid = inputBlurred ? inputValid : true

  const labelClassName = classNames('route-input__label', {
    'route-input__label--invalid': Boolean(!valid),
  })
  const className = classNames('route-input', {
    'route-input--invalid': Boolean(!valid),
  })

  return (
    <label
      className={labelClassName}
      htmlFor={props.id}>
      {props.label}
      <input
        id={props.id}
        className={className}
        type='text'
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={props.onFocus}
        value={props.value}
      />
    </label>
  )
}

export default RouteInput
