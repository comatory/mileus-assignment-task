import React, { useContext, useCallback } from 'react'
import classNames from 'classnames'

import Context from '../context'
import { useGraph } from '../../hooks/storage/graph'
import PlayerControls from './player-controls'
import PlayerMetadata from './player-metadata'

const PlayerContainer = () => {
  const { graphManager } = useContext(Context)
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

  return (
    <div className={classNames('player-container', {
      'player-container--enabled': Boolean(data),
      })}>
      <PlayerControls
        disabled={!data}
        onPlayRequest={handlePlayButtonClick}
        onStopRequest={handleStopButtonClick}
      />
      <PlayerMetadata data={data} />
    </div>
  )
}

export default PlayerContainer
