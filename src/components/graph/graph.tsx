import React, { useEffect, useContext, useRef } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

import { Graph as GraphData } from '../../interfaces/graph'
import Context from '../context'

const formatTimeToLocale = (value: string) => {
  const date = new Date(value)
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

interface Props {
  data: GraphData,
}

const Graph = (props: Props) => {
  const { graphManager } = useContext(Context)
  const ref = useRef(null)

  useEffect(() => {
    graphManager.registerPlayerGraphCanvas(ref)

    return () => graphManager.unregisterPlayerGraphCanvas()
  })

  return (
    <div className='graph'>
      <canvas
        id="graph-animation-canvas"
        ref={ref}
      />
      <LineChart
        width={480}
        height={300}
        data={props.data.segments}
      >
        <Line type="monotone" dataKey="speedInKm" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey='timestamp'
          tickFormatter={formatTimeToLocale}
        />
        <YAxis
          dataKey='speedInKm'
          tick={false}
        />
        <Tooltip />
      </LineChart>
    </div>
  )
}

export default Graph

