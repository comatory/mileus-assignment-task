import React, { useEffect, useContext, useRef } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

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
  hidden: boolean,
}

const Graph = (props: Props) => {
  const dispatch = useDispatch()
  const { graphActions } = useContext(Context)
  const ref = useRef(null)

  useEffect(() => {
    dispatch(graphActions.registerPlayerGraphCanvas(ref))

    return () => {
      dispatch(graphActions.unregisterPlayerGraphCanvas())
    }
  }, [ props.data ])

  return (
    <div className='graph'>
      <canvas
        id="graph-animation-canvas"
        ref={ref}
        className={classNames('animation-canvas', {
          'animation-canvas--hidden': props.hidden,
        })}
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

