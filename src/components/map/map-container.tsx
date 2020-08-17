import * as React from 'react'

import MapContent from './map-content'
import { config } from '../../hooks/storage'

const { useConfig } = config

const mapContent: React.Ref<HTMLDivElement> = React.createRef()

const MapContainer = () => {
  const token = useConfig('token')

  return (
    <div className='map-container'>
      token is: {token}
      <MapContent ref={mapContent} />
    </div>
  )
}

export default MapContainer
