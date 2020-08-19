import * as React from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const formatTimeToLocale = (value: string) => {
  const date = new Date(value)
  return date.toLocaleTimeString()
}

interface Props {
  data: Array<{ speedInKm: number, timestamp: number }>,
}

const Graph = (props: Props) => {
  return (
    <LineChart
      width={480}
      height={300}
      data={props.data}
    >
      <Line type="monotone" dataKey="speedInKm" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey='timestamp' tickFormatter={formatTimeToLocale} label='Time' />
      <YAxis dataKey='speedInKm' label='Speed' />
      <Tooltip />
    </LineChart>
  )
}

export default Graph

