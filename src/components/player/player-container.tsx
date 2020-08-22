import React, { useContext, useCallback } from 'react'
import classNames from 'classnames'

import Context from '../context'
import { useGraph } from '../../hooks/storage/graph'
import PlayerControls from './player-controls'
import PlayerMetadata from './player-metadata'
import { useGraphAnimation } from '../../hooks/storage/graph'

const PlayerContainer = () => {
  const { graphManager } = useContext(Context)
  const { isAnimationPlaying } = useGraphAnimation()
  const { data } = useGraph()

  const handlePlayButtonClick = useCallback(() => {
    if (!data) {
      return
    }

    graphManager.play()
  }, [ data ])

  const handleStopButtonClick = useCallback(() => {
    if (!data) {
      return
    }

    graphManager.stop()
  }, [ data ])

  const handlePauseButtonClick = useCallback(() => {
    if (!data) {
      return
    }

    graphManager.pause()
  }, [ data ])

  return (
    <div className={classNames('player-container', {
      'player-container--enabled': Boolean(data),
      })}>
      <PlayerControls
        disabled={!data}
        isAnimationPlaying={isAnimationPlaying}
        onPlayRequest={handlePlayButtonClick}
        onPauseRequest={handlePauseButtonClick}
        onStopRequest={handleStopButtonClick}
      />
      <PlayerMetadata data={data} />
    </div>
  )
}

export default PlayerContainer
