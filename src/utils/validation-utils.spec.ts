import { expect } from 'chai'

import ValidationUtils from './validation-utils'

describe('ValidationUtils', () => {
  it('should return false if input contains letters', () => {
    const results = ValidationUtils.validateLatLngString('abcd')

    expect(results).to.be.false
  })

  it('should return false if input contains single number', () => {
    const results = ValidationUtils.validateLatLngString('1')

    expect(results).to.be.false
  })

  it('should return false if input contains single float number', () => {
    const results = ValidationUtils.validateLatLngString('1.0')

    expect(results).to.be.false
  })

  it('should return false if input contains number separated with space', () => {
    const results = ValidationUtils.validateLatLngString('1 2')

    expect(results).to.be.false
  })

  it('should return true if input contains number separated with space and comma', () => {
    const results = ValidationUtils.validateLatLngString('1, 2')

    expect(results).to.be.true
  })

  it('should return true if input contains number floats separated with space and comma', () => {
    const results = ValidationUtils.validateLatLngString('1.0, 2.0')

    expect(results).to.be.true
  })

  it('should return true if input contains long number floats separated with ' +
     'space and comma', () => {
    const results = ValidationUtils.validateLatLngString('-74.5954437255853, 39.90314724277218')

    expect(results).to.be.true
  })

  it('should return false if latitude is over 90', () => {
    const results = ValidationUtils.validateLatLngString('90.1, 1.2')

    expect(results).to.be.false
  })

  it('should return true if latitude is 90', () => {
    const results = ValidationUtils.validateLatLngString('90.0, 1.2')

    expect(results).to.be.true
  })

  it('should return false if latitude is below -90', () => {
    const results = ValidationUtils.validateLatLngString('-90.1, 1.2')

    expect(results).to.be.false
  })

  it('should return true if latitude is -90', () => {
    const results = ValidationUtils.validateLatLngString('-90.0, 1.2')

    expect(results).to.be.true
  })

  it('should return false if longitude is over 180', () => {
    const results = ValidationUtils.validateLatLngString('1.0, 180.1')

    expect(results).to.be.false
  })

  it('should return true if longitude is 180', () => {
    const results = ValidationUtils.validateLatLngString('1.0, 180.0')

    expect(results).to.be.true
  })

  it('should return false if longitude is below -180', () => {
    const results = ValidationUtils.validateLatLngString('1.0, -180.1')

    expect(results).to.be.false
  })

  it('should return false if longitude is -180', () => {
    const results = ValidationUtils.validateLatLngString('1.0, -180.0')

    expect(results).to.be.true
  })
})
