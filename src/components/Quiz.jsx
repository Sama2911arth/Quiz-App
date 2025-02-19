import React, { useState } from "react";
import { quizData } from "../data/quizData";
import Question from "./Question";
import Scoreboard from "./Scoreboard";
import History from "./History";
import { saveQuizResult } from "../utils/indexedDB";
import "./Quiz.css";

const Quiz = () => {
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    //To check if quizdata is an array or not and it is also checking that 
    //length of quizdata array should not be zero

    if (!Array.isArray(quizData) || quizData.length === 0) {
        return <div className="error">No quiz data available.</div>;
    }

    //handle submit for each question
    const handleSubmit = (userAnswers) => {
        let correct = 0;
        quizData.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                correct++;
            }
        });

        setScore(correct);
        saveQuizResult(correct);
        setFinished(true);
    };

    const restartQuiz = () => {
        setScore(0);
        setFinished(false);
        setStarted(false);
        setShowResults(false);
    };

    return (
        <div className="quiz-container">
            {!started && !showResults ? (
                <div className="quiz-instructions">
                    <h1>Welcome to the Interactive Quiz!</h1>
                    <p><strong>Instructions:</strong></p>
                    <ul>
                        {/*instructions for the quiz */}
                        <li>For multiple-choice questions, select the one best answer (A, B, C, or D).
                        </li>
                        <li>For integer-type questions, write your numerical answer clearly.</li>
                        <li> You have 20 minutes to complete this quiz.</li>
                        <li>Two minutes will be given per question.</li>
                        <li>After two minutes have been passed next will come automatically. </li>
                        <li>The quiz will auto-submit after 30 minutes.</li>
                        <li>No calculators allowed.</li>
                    </ul>
                    {/*Start and history buttons  */}
                    <button className="start-button" onClick={() => setStarted(true)}>Start Quiz</button>

                    <button className="history-button" onClick={() => setShowResults(true)}>View Previous Quiz Results</button>
                </div>
            ) : showResults ? (
                <>

                    <Scoreboard score={score} total={quizData.length} onRestart={restartQuiz} />
                    <History />
                    <button className="back-button" onClick={() => setShowResults(false)}>Back to Home</button>
                </>
            ) : finished ? (
                <>
                    {/*Show results and quiz history if quiz has been submitted  */}
                    <Scoreboard score={score} total={quizData.length} onRestart={restartQuiz} />
                    <History />
                </>
            ) : (
                <Question questions={quizData} onSubmit={handleSubmit} />
            )}
        </div>
    );
};

export default Quiz;
