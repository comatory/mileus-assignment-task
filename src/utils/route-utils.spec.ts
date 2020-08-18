import { expect } from 'chai'
import { LngLat } from 'mapbox-gl'

import RouteUtils from './route-utils'

describe('RouteUtils', () => {
  it('should convert string to LngLat object', () => {
    const result = RouteUtils.convertStringToLngLat('1.2, 2.3')

    expect(result).to.be.instanceOf(LngLat)
  })

  it('should convert string to LngLat object with values', () => {
    const result = RouteUtils.convertStringToLngLat('1.2, 2.3')

    expect(result.lng).to.equal(1.2)
    expect(result.lat).to.equal(2.3)
  })

  it('should convert from LngLat to string with values', () => {
    const lngLat = new LngLat(1.2, 2.3)
    const result = RouteUtils.convertLngLatToString(lngLat)

    expect(result).to.equal('1.2, 2.3')
  })

  it('should convert null to empty string', () => {
    const result = RouteUtils.convertLngLatToString(null)

    expect(result).to.equal('')
  })
})
