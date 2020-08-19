import * as React from 'react'

import Button from '../core/button'

interface Props {
  disabled: boolean,
  onPlayRequest: () => void,
  onStopRequest: () => void,
}

const PlayerControls = (props: Props) => {
  return (
    <div className='player-controls'>
      <Button
        label='play'
        disabled={props.disabled}
        className='player-controls__play-btn'
        onClick={props.onPlayRequest}
      />
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