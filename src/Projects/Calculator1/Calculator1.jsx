//make square and cube calculator using useMemo

import React, {useMemo, useState} from 'react'
import './Calculator1.css'

const Calculator1 = () => {
    const [number, setNumber] = useState(0);

    const handleStatusChange = (e) => {
        setNumber(e.target.value);
    }

    const square = useMemo(() => {
        if (isNaN(number) ) return null;
        return (number * number);
    }, [number]);

    const cube = useMemo(() => {
        if (isNaN(number)) return null;
        return (number * number * number);
    }, [number]);

  return (
    <div className='cal'>
        <h1 style={{fontSize: "2rem"}}>Calculator using useMemo</h1>
        <label>Enter Number: </label>
        <input type='number' onChange={(e) => handleStatusChange(e)}/>
        <div>
            <span className='sq'>Sqaure: {square}</span><br></br>
            <span className='cube'>Cube: {cube}</span>
        </div>
    </div>
  )
}

export default Calculator1