import React from "react";
import "./Scoreboard.css"; // Import styles

const Scoreboard = ({ score, total, onRestart }) => {
    return (
        <div className="scoreboard-container">
            <h2 className="scoreboard-title">🎉 Quiz Completed!</h2>
            <p className="score-text">Your Score: <span>{score} / {total}</span></p>
            <button onClick={onRestart} className="retry-button">
                🔄 Retry Quiz
            </button>
        </div>
    );
};

export default Scoreboard;
