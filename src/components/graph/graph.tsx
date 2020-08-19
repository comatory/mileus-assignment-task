import * as React from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

import { Graph as GraphData } from '../../interfaces/graph'

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
  return (
    <div className='graph'>
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

