import * as React from 'react'

import 'mapbox-gl/dist/mapbox-gl.css'

const MapContent = React.forwardRef((_props, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div id='mapbox-container' className='map' ref={ref} />
  )
})

export default MapContent
