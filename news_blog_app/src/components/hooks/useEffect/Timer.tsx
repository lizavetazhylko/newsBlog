import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [status, setStatus] = useState('NOT_STARTED');
    const [timerId, setTimerId] = useState(0);
    const handleStartStopClick = (newStatus: string) => {
        setStatus(newStatus);
    }
    useEffect(() => {
        if (status === 'STARTED'){
            const newTimerId = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
            setTimerId(+newTimerId);
        } else {
            clearInterval(timerId);
        }
    }, [status])
    return (
        <div>
            <span>Seconds after start : {seconds}</span>
            <div>
                <Button variant="success" onClick={() => handleStartStopClick('STARTED')}>Start</Button>
            </div>
            <div>
                <Button variant="danger" onClick={() => handleStartStopClick('STOPPED')}>Stop</Button>
            </div>
        </div>
    )
};

export { Timer };