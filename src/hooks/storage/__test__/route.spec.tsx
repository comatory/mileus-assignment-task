import * as React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { expect } from 'chai'
import { LngLat } from 'mapbox-gl'

import { useRoutes, useRouteRequest } from '../route'
import Context from '../../../components/context'
import Ioc from '../../../interfaces/ioc'
import ioc from '../../../ioc'

import MockRouteStore, { IMockRouteStore } from '../../../mocks/stores/route-store.mock'

interface TestContext extends Ioc {
  routeStore: IMockRouteStore,
}

describe('route hooks', () => {
  let context: TestContext

  beforeEach(() => {
    context = {
      ...ioc,
      routeStore: new MockRouteStore(),
    }
  })

  const createTestContext = (context: TestContext): React.FunctionComponent => ({ children }: { children?: React.ReactNode }) => {
    return (
      <Context.Provider value={context}>
        {children}
      </Context.Provider>
    )
  }

  describe('useRoutes', () => {
    it('should return null for origin by default', () => {
      const { result } = renderHook(() => useRoutes(), { wrapper: createTestContext(context) })

      expect(result.current.origin).to.be.null
    })

    it('should return null for destination by default', () => {
      const { result } = renderHook(() => useRoutes(), { wrapper: createTestContext(context) })

      expect(result.current.destination).to.be.null
    })

    it('should return updated origin', () => {
      const origin = new LngLat(1.2, 2.3)

      const { result } = renderHook(() => useRoutes(), { wrapper: createTestContext(context) })

      act(() => context.routeStore.setOriginInTest(origin))

      expect(result.current.origin).to.equal(origin)
    })

    it('should return updated destination', () => {
      const destination = new LngLat(1.2, 2.3)

      const { result } = renderHook(() => useRoutes(), { wrapper: createTestContext(context) })

      act(() => context.routeStore.setDestinationInTest(destination))

      expect(result.current.destination).to.equal(destination)
    })
  })

  describe('useRouteRequest', () => {
    it('should return false for pending by default', () => {
      const { result } = renderHook(() => useRouteRequest(), { wrapper: createTestContext(context) })

      expect(result.current.pending).to.be.false
    })

    it('should return updated true value for pending by default', () => {
      context.routeStore.setRouteRequestPendingInTest(false)

      const { result } = renderHook(() => useRouteRequest(), { wrapper: createTestContext(context) })

      act(() => context.routeStore.setRouteRequestPendingInTest(true))

      expect(result.current.pending).to.be.true
    })

    it('should return updated false value for pending by default', () => {
      context.routeStore.setRouteRequestPendingInTest(true)

      const { result } = renderHook(() => useRouteRequest(), { wrapper: createTestContext(context) })

      act(() => context.routeStore.setRouteRequestPendingInTest(false))

      expect(result.current.pending).to.be.false
    })

    it('should return null for request error by default', () => {
      const { result } = renderHook(() => useRouteRequest(), { wrapper: createTestContext(context) })

      expect(result.current.requestError).to.be.null
    })

    it('should return updated request error', () => {
      const error = new Error('test-error')
      const { result } = renderHook(() => useRouteRequest(), { wrapper: createTestContext(context) })

      act(() => context.routeStore.setRouteRequestErrorInTest(error))

      expect(result.current.requestError).to.equal(error)
    })
  })
})
