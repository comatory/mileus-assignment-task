import React from 'react'

import Panel from './panel'
import MapContainer from './map/map-container'
import RouteControlContainer from './route-controls/route-control-container'
import GraphContainer from './graph/graph-container'
import PlayerContainer from './player/player-container'

const AppContainer = () => {

  return (
    <div className='app-container'>
      <Panel className='app-controls-panel'>
        <RouteControlContainer />
        <PlayerContainer />
      </Panel>
      <MapContainer />
      <GraphContainer />
    </div>
  )
}

export default AppContainer
