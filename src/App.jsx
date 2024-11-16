import React from 'react'
import CounterApp from './Projects/CounterApp/CounterApp'
import CounterApi from './Projects/CounterApp/CounterApi'
import Calculator1 from './Projects/Calculator1/Calculator1'
import Todo from './Projects/To-do/todo'

const App = () => {
  return (
    <div className='App'>
      <h1 style={{textAlign: "center", fontSize: "2rem"}}>React Mini Projects</h1>
      <CounterApp />
      <CounterApi />
      <Calculator1 />
      <br></br>
      <Todo />
    </div>
  )
}

export default App