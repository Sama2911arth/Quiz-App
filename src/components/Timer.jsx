import React, { useEffect, useState } from "react";
import "./Timer.css";

const Timer = ({ duration, onTimeUp, resetTrigger }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        setTimeLeft(duration); // Reset timer when a new question starts
    }, [resetTrigger]); // Reset when resetTrigger changes

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onTimeUp]);

    const formatTime = (seconds) => {
        //formatting time in seconds and mins
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return <div className="timer">{formatTime(timeLeft)}</div>;
};

export default Timer;
