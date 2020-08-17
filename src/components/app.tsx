import * as React from 'react'

import Context from './context'
import ioc from '../ioc'
import AppContainer from './app-container'

const App = () => {
  return (
    <Context.Provider value={ioc}>
      <div className='app'>
        <AppContainer />
      </div>
    </Context.Provider>
  )
}

export default App
