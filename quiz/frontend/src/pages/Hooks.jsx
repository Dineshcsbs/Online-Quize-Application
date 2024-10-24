import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ onTimerEnd }) => {
    const [timeLeft, setTimeLeft] = useState(1800); 

    useEffect(() => {
        let intervalId;

        if ( timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft(prevTime => {
                    return prevTime - 1;
                });
            }, 1000);
        }
        else {
            clearInterval(intervalId);
            onTimerEnd();
        }

        return () => clearInterval(intervalId); 
    }, [ timeLeft,onTimerEnd]);

    // const handleStart = () => {
    //     setIsActive(true);
    // };
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <>

            <>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</>

        </>
    );
};

export default CountdownTimer;