import React, {useState} from 'react'
import './styles.css'

const CounterApp = () => {
    const [counter, setCounter] = useState(0);

    const increase = () => {
        setCounter(counter+1);
    }

    const decrease = () => {
        setCounter(counter-1);
    }

    const reset = () => {
        setCounter(0);
    }

    return (
        <div className='counter-app'>
            <h2>Counter App</h2>
            <span> {counter} </span>
        <div className='buttons'>
            <div className='plus-minus'>
                <button onClick={increase} className='plus-btn'> + </button>
                <button onClick={decrease} className='minus-btn'> - </button>
            </div>
            <div>
                <button onClick={reset} className='reset-btn'> Reset </button>
            </div>
        </div>
        </div>
    )
}

export default CounterApp