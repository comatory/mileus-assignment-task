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
  }, [])

  return { data: graphData }
}

interface GraphAnimationData {
  isAnimationPlaying: boolean,
}

export const useGraphAnimation = (): GraphAnimationData => {
  const { graphStore } = useContext(Context)
  const [
    isAnimationPlaying,
    setIsAnimationPlaying ,
  ] = useState(graphStore.isAnimationPlaying())

  const handleGraphStoreChange = () => {
    setIsAnimationPlaying(graphStore.isAnimationPlaying())
  }

  useEffect(() => {
    const subscriber = graphStore.addListener(handleGraphStoreChange)

    return () => subscriber.remove()
  }, [])

  return { isAnimationPlaying }
}
