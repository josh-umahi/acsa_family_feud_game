import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import './roundOfGame.css';
import x_sign from "../assets/x_sign.png"
import wrong_audio from "../assets/wrong_audio.mp3"
import database from "../database.js"
import AnswerBox from './AnswerBox';
import GameButton from './GameButton';

const RoundOfGame = () => {
    const { id } = useParams();
    const [question_number] = useState(parseInt(id))
    const [question_index] = useState(parseInt(id) - 1)
    const [question_object] = useState(database[question_index])
    const navigate = useNavigate()
    const [showX, setShowX] = useState(false)
    const audio = new Audio()

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === "x" && id !== null) {
                action_displayX()
            }
        })
    }, [])

    const action_displayX = () => {
        if (!showX) {
            new Audio(wrong_audio).play();
        }

        // * Decided to make it a toggle so that if the app hooks on 
        // * the X being displayed you could unhook it by clicking again 
        setShowX(!showX)

        setTimeout(() => {
            setShowX(false)
        }, 2000)
    }

    const action_showAllAnswers = () => {

    }

    const action_newQuestion = () => {
        navigate('/')
    }

    return (
        // TODO: Never use this "&&" notation with a number value because 0 will make it evaluate to false even if that wasn't your intention.
        question_object &&
        <div className='roundOfGameSection'>
            <div className='questionTitleDiv'>
                <h3>{`${question_number}) ${question_object.Question_Title}`}</h3>
            </div>
            <div className="allAnswerDiv">
                <AnswerBox answerID="A" answerValue={question_object.Answer_1} answerPoints={question_object.Answer_1_Points} />
                <AnswerBox answerID="B" answerValue={question_object.Answer_2} answerPoints={question_object.Answer_2_Points} />
                <AnswerBox answerID="C" answerValue={question_object.Answer_3} answerPoints={question_object.Answer_3_Points} />
                <AnswerBox answerID="D" answerValue={question_object.Answer_4} answerPoints={question_object.Answer_4_Points} />
                <AnswerBox answerID="E" answerValue={question_object.Answer_5} answerPoints={question_object.Answer_5_Points} />
                <AnswerBox answerID="F" answerValue={question_object.Answer_6} answerPoints={question_object.Answer_6_Points} />
            </div>
            <div className="gameMenuDiv">
                <GameButton title="Play “X” Sound" clickAction={action_displayX} bgColor="#B3281E" />
                <GameButton title="Show All Answers" clickAction={action_showAllAnswers} bgColor="#066F6A" />
                <GameButton title="New Question" clickAction={action_newQuestion} bgColor="#000000" />
            </div>
            {showX && <img className='xSymbol' src={x_sign} alt="X Symbol" />}
        </div>
    )
}

export default RoundOfGame