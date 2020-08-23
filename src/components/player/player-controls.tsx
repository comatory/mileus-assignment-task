import React, { useCallback, useState } from 'react'
import classNames from 'classnames'

import Button from '../core/button'
import { DEFAULT_MULTIPLICATION_FACTOR } from '../../constants'

interface Props {
  controlDisabled: boolean,
  isAnimationPlaying: boolean,
  multiplicationDisabled: boolean,
  onPlayRequest: () => void,
  onPauseRequest: () => void,
  onStopRequest: () => void,
  onSelectMultiplication: (value: number) => void,
}

const MULTIPLICATION_FACTORS = [
  1,
  2,
  4,
  8,
  16
]

const multiplicationOptions = (factors: typeof MULTIPLICATION_FACTORS) => {
  return factors.map((factor) => (
    <option key={`${factor}-multiplication`} value={factor}>
      {factor}x
    </option>
  ))
}

const PlayerControls = (props: Props) => {
  const [ multiplication, setMultiplication ] = useState(DEFAULT_MULTIPLICATION_FACTOR)

  const handleMultiplicationSelectChange = useCallback((e: React.SyntheticEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget
    setMultiplication(Number(value))
    props.onSelectMultiplication(Number(value))
  }, [ multiplication ])

  return (
    <div className='player-controls'>
      {props.isAnimationPlaying ?
        <Button
          label='pause'
          disabled={props.controlDisabled}
          className={classNames('player-controls__pause-btn', {
            'player-controls__pause-btn--playing': props.isAnimationPlaying,
          })}
          onClick={props.onPauseRequest}
        /> :
        <Button
          label='play'
          disabled={props.controlDisabled}
          className='player-controls__play-btn'
          onClick={props.onPlayRequest}
        />
      }
      <Button
        label='stop'
        disabled={props.controlDisabled}
        className='player-controls__stop-btn'
        onClick={props.onStopRequest}
      />
      <select
        name="multiplication"
        className='player-controls__multiplication-select'
        onChange={handleMultiplicationSelectChange}
        disabled={props.multiplicationDisabled}
      >
        {multiplicationOptions(MULTIPLICATION_FACTORS)}
      </select>
    </div>
  )
}

export default PlayerControls
