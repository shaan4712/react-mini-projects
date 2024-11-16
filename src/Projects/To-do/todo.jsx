import React, {useState} from "react";
import './todo.css'

export default function Todo() {
    const [tasks, setTasks] = useState([]);
    const [inp, setInp] = useState("");
  
    const handleSubmit = (val) => {
      setTasks([...tasks, val]);
    }
  
    const handleInput = (val) => {
      setInp(val);
    }

    //delete is done through index, not value
    const handleDelete = (i) => {
        setTasks(tasks.filter((_, ind) => {
            return ind !== i;
        }));
    }

    
    return (
      <div className="todo">
        <h1 style={{fontSize: "1.8rem"}}>Todo List</h1>
        <div className="input">
          <input type="text" placeholder="Add your task" onChange={(e) => handleInput(e.target.value)}/>
          <div>
            <button onClick = {() => {handleSubmit(inp)}}>Submit</button>
          </div>
        </div>
        <ul className="list">
          {tasks.map((task, index) => (<li className="item" key={index}>
            <span>{task}</span>
            <button onClick={() => {handleDelete(index)}}>Delete</button>
          </li>))}

          {tasks.length === 0 && <p>No Tasks yet!</p>}
        </ul>
      </div>
    );
  }
  