import * as React from 'react'

import Context from '../components/context'

import MockRouteStore from '../mocks/stores/route-store.mock'

export interface ITestContext {
  routeStore: MockRouteStore,
}

export const createTestContext = (context: ITestContext): React.FunctionComponent => ({ children }: { children?: React.ReactNode }) => {
    return (
      // @ts-ignore: I would have to create a context that can be re-used with tests as well. This would probably include
      //             converting all classes to include interfaces that are same for implementations & mocks
      <Context.Provider value={context}>
        {children}
      </Context.Provider>
    )
  }

