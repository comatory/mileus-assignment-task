import { useState, useEffect, useContext } from 'react'

import Context from '../../components/context'
import { Graph } from '../../interfaces/graph'

interface GraphData {
  data: Graph | null,
}

export const useGraph = (): GraphData => {
  const { graphStore } = useContext(Context)
  const [ graphData, setGraphData ] = useState(graphStore.getGraphData())

  const handleGraphStoreChange = () => {
    setGraphData(graphStore.getGraphData())
  }

  useEffect(() => {
    const subscriber = graphStore.addListener(handleGraphStoreChange)

    return () => subscriber.remove()
  })

  return { data: graphData }
}

