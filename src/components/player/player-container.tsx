import React, { useContext, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { RootState } from '../../interfaces/state'
import Context from '../context'
import PlayerControls from './player-controls'
import PlayerMetadata from './player-metadata'

const PlayerContainer = () => {
  const dispatch = useDispatch()
  const { graphActions } = useContext(Context)
  const isAnimationPlaying = useSelector((state: RootState) => state.graph.isAnimationPlaying)
  const data = useSelector((state: RootState) => state.graph.data)

  const handlePlayButtonClick = useCallback(() => {
    if (!data) {
      return
    }

    dispatch(graphActions.play())
  }, [ graphActions, data ])

  const handleStopButtonClick = useCallback(() => {
    if (!data) {
      return
    }

    dispatch(graphActions.stop())
  }, [ data ])

  const handlePauseButtonClick = useCallback(() => {
    if (!data) {
      return
    }

    dispatch(graphActions.pause())
  }, [ data ])

  const handleMultiplicationSelectChange = useCallback((value: number) => {
    dispatch(graphActions.setMultiplication(value))
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
