import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import ValidationUtils from '../../utils/validation-utils'

interface Props {
  id: string,
  value: string,
  label: string,
  valid: boolean,
  disabled?: boolean,
  //onChange: (e: React.SyntheticEvent<HTMLInputElement>, id: string, validity: boolean) => void,
  onBlur?: (value: string) => void,
  //onFocus?: (e: React.SyntheticEvent<HTMLInputElement>) => void,
  onSubmit: (value: string) => void,
}

const RouteInput = (props: Props) => {
  const [ value, setValue ] = useState(props.value)
  const [ valid, setValid ] = useState(ValidationUtils.validateLatLngString(value))

  useEffect(() => {
    setValue(props.value)
    setValid(props.valid)
  }, [ props.value ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget

    setValue(value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e as any

    const valid = ValidationUtils.validateLatLngString(value)
    if (keyCode === 13 && valid) {
      props.onSubmit(value)
    }
  }

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    const valid = ValidationUtils.validateLatLngString(value)

    setValid(valid)

    if (props.onBlur) {
      props.onBlur(value)
    }
  }

  const labelClassName = classNames('route-input__label', {
    'route-input__label--invalid': !valid,
  })
  const className = classNames('route-input', {
    'route-input--invalid': !valid,
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
        onKeyDown={handleInputKeyDown}
        onBlur={handleInputBlur}
        value={value}
        disabled={Boolean(props.disabled)}
      />
    </label>
  )
}

RouteInput.defaultProps = {
  valid: true,
}

export default RouteInput
