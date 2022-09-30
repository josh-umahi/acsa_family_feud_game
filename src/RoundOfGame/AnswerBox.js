import React from 'react'
import correct_audio from "../assets/correct_audio.mp3"

const AnswerBox = ({ answerID, answerValue, answerPoints, showAnswerValue, setShowAnswerValue }) => {

    const handleClick = (e) => {
        e.preventDefault()
        if (!showAnswerValue) {
            new Audio(correct_audio).play();
        }
        setShowAnswerValue(!showAnswerValue)
    }

    return (
        showAnswerValue ?
            <button onClick={handleClick} className="answerBox">{answerValue}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;{answerPoints}</button> :
            <button onClick={handleClick} className="answerBox hidden">{answerID}</button>
    )
}

export default AnswerBox