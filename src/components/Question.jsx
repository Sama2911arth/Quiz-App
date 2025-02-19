import React, { useState } from "react";
import Timer from "./Timer"; // Import Timer Component
import "./Question.css";

const Question = ({ questions, onSubmit }) => {
    const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
    const [feedback, setFeedback] = useState(Array(questions.length).fill(""));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [resetTimer, setResetTimer] = useState(0); // Trigger for resetting the timer

    // Timer duration per question (2 minutes = 120 seconds)
    const QUESTION_TIME_LIMIT = 120;

    //if the time is up then question will be skipped 
    //to move to further question
    const handleTimeUp = () => {
        setFeedback((prevFeedback) => {
            const updatedFeedback = [...prevFeedback];
            updatedFeedback[currentQuestionIndex] = "⏳ Time's up! Skipped.";
            return updatedFeedback;
        });

        setTimeout(() => goToNextQuestion(false), 1000);
    };

    //handling selection of answers
    const handleAnswerSelect = (answer) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setSelectedAnswers(newAnswers);
    };

    const handleSubmit = () => {
        if (selectedAnswers[currentQuestionIndex] === null) {
            setFeedback((prevFeedback) => {
                const updatedFeedback = [...prevFeedback];
                updatedFeedback[currentQuestionIndex] = "⚠️ Please select an answer.";
                return updatedFeedback;
            });
            return;
        }

        const isCorrect = selectedAnswers[currentQuestionIndex] === questions[currentQuestionIndex].answer;
        setFeedback((prevFeedback) => {
            const updatedFeedback = [...prevFeedback];
            updatedFeedback[currentQuestionIndex] = isCorrect ? "✅ Correct!" : "❌ Wrong!";
            return updatedFeedback;
        });

        setTimeout(() => goToNextQuestion(isCorrect), 1000);
    };

    const goToNextQuestion = (isCorrect) => {
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setResetTimer((prev) => prev + 1); // Reset the timer
        } else {
            onSubmit(selectedAnswers); // End quiz when all questions are done
        }
    };

    return (
        <div className="main-container">
            {/* Timer positioned in the top-right corner */}
            <div className="timer-container">
                <Timer duration={QUESTION_TIME_LIMIT} onTimeUp={handleTimeUp} resetTrigger={resetTimer} />
            </div>

            <div className="questions-container">
                <div className="question-box">
                    {/*question title and ans will come accordingly*/}
                    <h1 className="question-title">Question {currentQuestionIndex + 1}</h1>
                    <p className="question-text">{questions[currentQuestionIndex].question}</p>
                    {/*if the question is of integer type then  input field will come*/}
                    <div className="options-container">
                        {questions[currentQuestionIndex].type === "integer" ? (
                            <input
                                type="number"
                                className="integer-input"
                                value={selectedAnswers[currentQuestionIndex] || ""}
                                onChange={(e) => handleAnswerSelect(Number(e.target.value))}
                            />

                        ) : (

                            questions[currentQuestionIndex].options?.map((option) => (

                                <label key={option} className="option-label">
                                    {/*if the question is of MCQ type then  radio buttons will come as options*/}
                                    <input
                                        type="radio"
                                        name={`options-${currentQuestionIndex}`}
                                        value={option}
                                        checked={selectedAnswers[currentQuestionIndex] === option}
                                        onChange={() => handleAnswerSelect(option)}
                                        className="option-radio"
                                    />
                                    {option}
                                </label>
                            ))
                        )}
                    </div>

                    <button className="submit-button" onClick={handleSubmit}>
                        Submit
                    </button>
                    {/*Feedback if the ans was selected whether right or wrong*/}
                    <p className={`feedback ${feedback[currentQuestionIndex].includes("Correct") ? "correct" : "wrong"}`}>
                        {feedback[currentQuestionIndex]}
                    </p>
                </div>
            </div>
            {/*End Quiz button to end if all question have been answered*/}
            <button className="end-button" onClick={() => onSubmit(selectedAnswers)}>
                End Quiz
            </button>
        </div>
    );
};

export default Question;
