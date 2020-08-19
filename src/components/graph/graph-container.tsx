import React, { Suspense, useState, useContext, useEffect, lazy } from 'react'
import Context from '../context'

// NOTE: not handling different legs
const DEFAULT_LEG = 0

const Graph = lazy(() => import('./graph'))

const Loading = () => {
  return (
    <div className='loading'>
      Loading graph ...
    </div>
  )
}

const GraphContainer = () => {
  const { graphStore } = useContext(Context)
  const [ graphData, setGraphData ] = useState(null)
  const [ activeRoute, setActiveRoute ] = useState(null)

  // NOTE: Not handling different leg of journeys because
  //       this is not full featured app
  const data = null

  return (
    <div className='graph-container'>
      {data &&
      <Suspense fallback={<Loading />}>
          <Graph data={data} />
        </Suspense>
      }
    </div>
  )
}

export default GraphContainer


