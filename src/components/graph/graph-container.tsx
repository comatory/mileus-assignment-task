import React, { Suspense, useState, lazy } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { RootState } from '../../interfaces/state'
import Button from '../core/button'

const Graph = lazy(() => import('./graph'))

const Loading = () => {
  return (
    <div className='graph-container--loading'>
      Loading graph ...
    </div>
  )
}

const GraphContainer = () => {
  const data = useSelector((state: RootState) => state.graph.data)
  const [ hidden, setHidden ] = useState(false)

  const handleHideButtonClick = () => {
    setHidden(!hidden)
  }

  return (
    <div className={classNames('graph-container', {
        'graph-container--hidden': hidden,
        'graph-container--loaded': Boolean(data),
      })}>
      {data &&
      <Suspense fallback={<Loading />}>
          <Button
            className='graph-container__hide-btn'
            type='secondary'
            label={hidden ? '⇧' : '⇩'}
            onClick={handleHideButtonClick}
          />
          <Graph data={data} hidden={hidden} />
        </Suspense>
      }
    </div>
  )
}

export default GraphContainer


