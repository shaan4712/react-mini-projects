import React, { useEffect, useState } from 'react'
import './CounterApi.css'

const CounterApi = () => {
    const [counter, setCounter] = useState(0);

    //fetch from api
    const fetchCounter = async () => {
        try{
            const response = await fetch("https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json");
            const data = await response.json();
            setCounter(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCounter();
    }, []);

    const updateCounter = async (newVal) => {
        try {
            const response = await fetch("https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json", 
                {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ 'counter1' : newVal})
                });
            if (!response.ok) throw new Error("HTTP Error")
            setCounter(newVal);
        } catch(error){
            console.log(error);
        }
    }

    const increase = () => {
        updateCounter(counter + 1);
        setCounter(counter + 1);
    }

    const decrease = () => {
        updateCounter(counter - 1);
        setCounter(counter - 1);
    }

    const handleChange = (val) => {
        updateCounter(val);
        setCounter(val);
    }

    const reset = () => {
        updateCounter(0);
        setCounter(0);
    }

  return (
    <div className='app'>
        <span className='counter'> {counter} </span>
        <div className='btn'>
            <button onClick={increase}> + </button>
            <button onClick={decrease}> - </button>
            <button onClick={reset}> Reset </button>
        </div>
        <div>
            <input onChange={(e) => handleChange(Number(e.target.value))}></input>
        </div>
    </div>
  )
}

export default CounterApi