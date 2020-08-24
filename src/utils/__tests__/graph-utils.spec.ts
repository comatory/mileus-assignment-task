import { expect } from 'chai'

import GraphUtils from '../graph-utils'

describe('GraphUtils', () => {
  describe('timestamps', () => {
    it('should create timestamp from accumulated time and duration in ms', () => {
      expect(GraphUtils.addTimestamps(100, 15)).to.equal(15100)
    })

    it('should return zero if accumulated time is missing', () => {
      expect(GraphUtils.addTimestamps(0, 15)).to.equal(0)
    })
  })

  describe('convert speed to kilometers', () => {
    expect(GraphUtils.convertToKmH(15)).to.equal(54)
  })

  describe('parse annotation', () => {
    it('should return empty array when empty distance annotations are present', () => {
      expect(GraphUtils.parseAnnotation({
        distance: [],
        duration: [ 1 ],
        speed: [ 2 ],
      }, [
        [ 1.2, 2.1 ]
      ])).to.deep.equal([])
    })

    it('should return segments', () => {
      const result = GraphUtils.parseAnnotation({
        distance: [ 1.2, 2.2, 3.3 ],
        duration: [ 1, 2, 3 ],
        speed: [ 4, 5, 6 ],
      }, [
        [ 12.12, 21.21 ],
        [ 12.14, 21.25 ],
        [ 12.24, 21.35 ],
      ])

      expect(result).to.have.length(3)
    })

    it('should return segments with distance', () => {
      const result = GraphUtils.parseAnnotation({
        distance: [ 1.2, 2.2, 3.3 ],
        duration: [ 1, 2, 3 ],
        speed: [ 4, 5, 6 ],
      }, [
        [ 12.12, 21.21 ],
        [ 12.14, 21.25 ],
        [ 12.24, 21.35 ],
      ])

      expect(result[0].distance).to.equal(1.2)
      expect(result[1].distance).to.equal(2.2)
      expect(result[2].distance).to.equal(3.3)
    })

    it('should return segments with duration', () => {
      const result = GraphUtils.parseAnnotation({
        distance: [ 1.2, 2.2, 3.3 ],
        duration: [ 1, 2, 3 ],
        speed: [ 4, 5, 6 ],
      }, [
        [ 12.12, 21.21 ],
        [ 12.14, 21.25 ],
        [ 12.24, 21.35 ],
      ])

      expect(result[0].duration).to.equal(1)
      expect(result[1].duration).to.equal(2)
      expect(result[2].duration).to.equal(3)
    })

    it('should return segments with speed', () => {
      const result = GraphUtils.parseAnnotation({
        distance: [ 1.2, 2.2, 3.3 ],
        duration: [ 1, 2, 3 ],
        speed: [ 4, 5, 6 ],
      }, [
        [ 12.12, 21.21 ],
        [ 12.14, 21.25 ],
        [ 12.24, 21.35 ],
      ])

      expect(result[0].speed).to.equal(4)
      expect(result[1].speed).to.equal(5)
      expect(result[2].speed).to.equal(6)
    })

    it('should return segments with speed in KM', () => {
      const result = GraphUtils.parseAnnotation({
        distance: [ 1.2, 2.2, 3.3 ],
        duration: [ 1, 2, 3 ],
        speed: [ 4, 5, 6 ],
      }, [
        [ 12.12, 21.21 ],
        [ 12.14, 21.25 ],
        [ 12.24, 21.35 ],
      ])

      expect(result[0].speedInKm).to.equal(14.4)
      expect(result[1].speedInKm).to.equal(18)
      expect(result[2].speedInKm).to.equal(21.6)
    })

    it('should return segments with calculated timestamp ' +
       'based on current time', () => {
      const mockNow = new Date('Wed Aug 19 2020 10:30:00 GMT+0200 (Central European Summer Time')
      const spy = jest.spyOn(global, 'Date')
        // @ts-ignore: This is naive implementation of date mocking, I would create sth better
        .mockImplementation(() => mockNow)

      const result = GraphUtils.parseAnnotation({
        distance: [ 1.2, 2.2, 3.3 ],
        duration: [ 1, 2, 3 ],
        speed: [ 4, 5, 6 ],
      }, [
        [ 12.12, 21.21 ],
        [ 12.14, 21.25 ],
        [ 12.24, 21.35 ],
      ])

      expect(result[0].timestamp).to.equal(1597825800000) // +1 sec
      expect(result[1].timestamp).to.equal(1597825802000) // +2 sec
      expect(result[2].timestamp).to.equal(1597825805000) // +3 sec

      spy.mockRestore()
    })

    it('should return segments with coordinates', () => {
      const result = GraphUtils.parseAnnotation({
        distance: [ 1.2, 2.2, 3.3 ],
        duration: [ 1, 2, 3 ],
        speed: [ 4, 5, 6 ],
      }, [
        [ 12.12, 21.21 ],
        [ 12.14, 21.25 ],
        [ 12.24, 21.35 ],
      ])

      expect(result[0].coordinates)
        .to.deep.equal([ 12.12, 21.21 ])
      expect(result[1].coordinates)
        .to.deep.equal([ 12.14, 21.25 ])
      expect(result[2].coordinates)
        .to.deep.equal([ 12.24, 21.35 ])
    })
  })
})
