import React from 'react'
import CounterApp from './Projects/CounterApp/CounterApp'
import CounterApi from './Projects/CounterApp/CounterApi'

const App = () => {
  return (
    <div className='App'>
      <h1 style={{textAlign: "center", fontSize: "2rem"}}>React Mini Projects</h1>
      <CounterApp />
      <CounterApi />
    </div>
  )
}

export default App