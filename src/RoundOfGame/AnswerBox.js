import React from 'react'

const AnswerBox = ({ answerID, answerValue, answerPoints }) => {
    return (
        <h3 className="answerBox">{answerValue}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;{answerPoints}</h3>
    )
}

export default AnswerBox