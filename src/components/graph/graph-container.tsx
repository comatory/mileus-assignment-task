import React, { Suspense, useState, lazy } from 'react'
import classNames from 'classnames'

import { useGraph } from '../../hooks/storage/graph'
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
  const { data } = useGraph()
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
          <Graph data={data} />
        </Suspense>
      }
    </div>
  )
}

export default GraphContainer


