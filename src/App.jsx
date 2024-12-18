import React from 'react'
import CounterApp from './Projects/CounterApp/CounterApp'
import CounterApi from './Projects/CounterApp/CounterApi'
import Calculator1 from './Projects/Calculator1/Calculator1'
import Todo from './Projects/To-do/todo'
import Pagination from './Projects/Pagination/Pagination'
import Clock from './Projects/Clock/Clock'
import DarkModeApp from './DarkMode'

const App = () => {
  return (
    <div className='App'>
      <h1 style={{textAlign: "center", fontSize: "3rem"}}>React Mini Projects</h1>
      <CounterApp />
      <CounterApi />
      <Calculator1 />
      <br></br>
      <Todo />
      <br></br>
      <Pagination />
      <br></br>
      <Clock />
      <br></br>
      <DarkModeApp />
    </div>
  )
}

export default App