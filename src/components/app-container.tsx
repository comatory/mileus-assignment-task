import React from 'react'

import MapContainer from './map/map-container'
import RouteControlContainer from './route-controls/route-control-container'
import GraphContainer from './graph/graph-container'

const AppContainer = () => {

  return (
    <div className='app-container'>
      <RouteControlContainer />
      <MapContainer />
      <GraphContainer />
    </div>
  )
}

export default AppContainer
