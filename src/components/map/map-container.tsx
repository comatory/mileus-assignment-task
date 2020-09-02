import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import MapContent from './map-content'
import Context from '../context'

const mapContent: React.Ref<HTMLDivElement> = React.createRef()

const MapContainer = () => {
  const dispatch = useDispatch()
  const { mapActions } = useContext(Context)

  useEffect(() => {
    if (!mapContent.current) {
      return
    }
    dispatch(mapActions.createMap(mapContent.current))

    return () => {
      dispatch(mapActions.removeMap())
    }
  }, [])
    

  return (
    <div className='map-container'>
      <MapContent ref={mapContent} />
    </div>
  )
}

export default MapContainer
