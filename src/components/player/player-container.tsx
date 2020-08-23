import React, { useContext, useCallback } from 'react'
import classNames from 'classnames'

import Context from '../context'
import { useGraph } from '../../hooks/storage/graph'
import PlayerControls from './player-controls'
import PlayerMetadata from './player-metadata'
import { useGraphAnimation } from '../../hooks/storage/graph'

const PlayerContainer = () => {
  const { graphManager, graphActions } = useContext(Context)
  const { isAnimationPlaying } = useGraphAnimation()
  const { data } = useGraph()

  const handlePlayButtonClick = useCallback(() => {
    if (!data) {
      return
    }

    graphManager.play()
  }, [ graphManager, data ])

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

  const handleMultiplicationSelectChange = useCallback((value: number) => {
    graphActions.setMultiplication(value)
  }, [ data ])

  return (
    <div className={classNames('player-container', {
      'player-container--enabled': Boolean(data),
      })}>
      <PlayerControls
        controlDisabled={!Boolean(data)}
        multiplicationDisabled={Boolean(data)}
        isAnimationPlaying={isAnimationPlaying}
        onPlayRequest={handlePlayButtonClick}
        onPauseRequest={handlePauseButtonClick}
        onStopRequest={handleStopButtonClick}
        onSelectMultiplication={handleMultiplicationSelectChange}
      />
      <PlayerMetadata data={data} />
    </div>
  )
}

export default PlayerContainer
