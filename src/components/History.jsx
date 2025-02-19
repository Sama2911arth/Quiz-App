import React, { useEffect, useState } from "react";
import { getQuizHistory } from "../utils/indexedDB";
import "./History.css"; // Apply new styles

const History = ({ onBack }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        async function fetchHistory() {
            const data = await getQuizHistory();
            setHistory(data.reverse()); // Show latest attempts first
        }
        fetchHistory();
    }, []);

    return (
        <div className="history-container">
            <h2 className="history-title">📜 Quiz History:</h2>
            {history.length === 0 ? (
                <p className="no-history">No previous quiz attempts.</p>
            ) : (
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Attempt #</th>
                            <th>Score</th>
                            <th>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*Quiz history showing no. of attempts , score  including date and time */}
                        {history.map((attempt, index) => (
                            <tr key={attempt.id}>
                                <td>{history.length - index}</td>
                                <td>{attempt.score} / 10</td>
                                <td>{new Date(attempt.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
};

export default History;
