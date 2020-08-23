import * as React from 'react'

import { Graph } from '../../interfaces/graph'
import GraphUtils from '../../utils/graph-utils'

interface Props {
  data: Graph | null,
}

const PlayerMetadata = (props: Props) => {
  const { data } = props
  const distanceInKm = (data && GraphUtils.convertToKm(data.distance)) || 'N/A'
  const durationInMinutes = (data && GraphUtils.convertToHoursAndMinutes(data.duration)) || 'N/A'

  return (
    <div className='player-metadata'>
      <dl>
        <dt className='player-metadata__property'>Distance (km)</dt>
        <dd>{distanceInKm}</dd>
        <dt className='player-metadata__property'>Duration (hh:mm)</dt>
        <dd>{durationInMinutes}</dd>
      </dl>
    </div>
  )
}

export default PlayerMetadata
