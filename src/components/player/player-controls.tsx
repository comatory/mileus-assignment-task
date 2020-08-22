import * as React from 'react'
import classNames from 'classnames'

import Button from '../core/button'

interface Props {
  disabled: boolean,
  isAnimationPlaying: boolean,
  onPlayRequest: () => void,
  onPauseRequest: () => void,
  onStopRequest: () => void,
}

const PlayerControls = (props: Props) => {
  return (
    <div className='player-controls'>
      {props.isAnimationPlaying ?
        <Button
          label='pause'
          disabled={props.disabled}
          className={classNames('player-controls__pause-btn', {
            'player-controls__pause-btn--playing': props.isAnimationPlaying,
          })}
          onClick={props.onPauseRequest}
        /> :
        <Button
          label='play'
          disabled={props.disabled}
          className='player-controls__play-btn'
          onClick={props.onPlayRequest}
        />
      }
      <Button
        label='stop'
        disabled={props.disabled}
        className='player-controls__stop-btn'
        onClick={props.onStopRequest}
      />
    </div>
  )
}

export default PlayerControls
