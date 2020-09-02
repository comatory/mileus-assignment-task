import React, { useContext, useEffect } from 'react'

import MapContent from './map-content'
import Context from '../context'

const mapContent: React.Ref<HTMLDivElement> = React.createRef()

const MapContainer = () => {
  const { mapManager } = useContext(Context)

  useEffect(() => {
    if (!mapContent.current) {
      return
    }
    mapManager.createMap(mapContent.current)

    return () => mapManager.removeMap()
  }, [])
    

  return (
    <div className='map-container'>
      <MapContent ref={mapContent} />
    </div>
  )
}

export default MapContainer
