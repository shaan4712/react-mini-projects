import React, { useEffect, useState } from 'react'
import './Clock.css'

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return (() => clearInterval(intervalId));
    }, [])

    return (
        <div className='clock-app'>
            <h1 style={{fontSize: "2rem"}}>Digital Clock</h1>
            <div className='clock'>
                <span>{time.getHours().toString().padStart(2, "0")} : </span>
                <span>{time.getMinutes().toString().padStart(2, "0")} : </span>
                <span>{time.getSeconds().toString().padStart(2, "0")}</span>
            </div>

            <div className='date'>
                {
                    time.toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        day: "2-digit",
                        month: "long"
                    })
                }
            </div>
            <div>
                {/* getMonth gives based on 0-based indexing */}
                { time.getDate() } / { time.getMonth() + 1 } / { time.getFullYear()}
            </div>

        </div>
    );
}

export default Clock;