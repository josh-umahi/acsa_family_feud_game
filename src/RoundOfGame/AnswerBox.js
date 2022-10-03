import React from 'react'
import correct_audio from "../assets/correct_audio.mp3"

const AnswerBox = ({ answerID, answerValue, answerPoints, showAnswerValue, setShowAnswerValue }) => {
    const correct_audio_element = new Audio(correct_audio)

    const handleClick = (e) => {
        e.preventDefault()
        if (!showAnswerValue) {
            correct_audio_element.play();
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