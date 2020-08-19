import React from 'react'

import MapContainer from './map/map-container'
import RouteControlContainer from './route-controls/route-control-container'

const AppContainer = () => {

  return (
    <div className='app-container'>
      <RouteControlContainer />
      <MapContainer />
    </div>
  )
}

export default AppContainer
