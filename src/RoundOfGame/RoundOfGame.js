import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import './roundOfGame.css';
import x_sign from "../assets/x_sign.png"
import wrong_audio from "../assets/wrong_audio.mp3"
import show_answers_audio from "../assets/show_answers_audio.mp3"
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
  const [xCount, setXCount] = useState(0);
  const [showAnswer_A, set_showAnswer_A] = useState(false)
  const [showAnswer_B, set_showAnswer_B] = useState(false)
  const [showAnswer_C, set_showAnswer_C] = useState(false)
  const [showAnswer_D, set_showAnswer_D] = useState(false)
  const [showAnswer_E, set_showAnswer_E] = useState(false)
  const [showAnswer_F, set_showAnswer_F] = useState(false)
  const wrong_audio_element = new Audio(wrong_audio)
  const show_answers_audio_element = new Audio(show_answers_audio)
  const [frozenTotal, setFrozenTotal] = useState(null);

  const totalPoints = frozenTotal !== null
    ? frozenTotal
    : (showAnswer_A ? Number(question_object.Answer_1_Points) : 0) +
      (showAnswer_B ? Number(question_object.Answer_2_Points) : 0) +
      (showAnswer_C ? Number(question_object.Answer_3_Points) : 0) +
      (showAnswer_D ? Number(question_object.Answer_4_Points) : 0) +
      (showAnswer_E ? Number(question_object.Answer_5_Points) : 0) +
      (showAnswer_F ? Number(question_object.Answer_6_Points) : 0);

  useEffect(() => {
    const onKeyPress = (event) => {
      if (event.key?.toLowerCase() === "x" && id !== null) {
        action_displayX();
        console.log("yes");
      }
    };

    document.addEventListener('keypress', onKeyPress);
    return () => {
      document.removeEventListener('keypress', onKeyPress);
    };
  }, [id]);

  const action_displayX = () => {
    if (!showX) {
      wrong_audio_element.play();
    }

    // * Decided to make it a toggle so that if the app hooks on 
    // * the X being displayed you could unhook it by clicking again 
    setShowX(!showX);

    // ✅ Only increase if below 3
    setXCount((prev) => (prev < 3 ? prev + 1 : prev));

    setTimeout(() => {
      setShowX(false);
    }, 2000);
  };

  const action_undoX = () => {
    setXCount(prev => (prev > 0 ? prev - 1 : prev));
  };

  const action_showAllAnswers = () => {
    show_answers_audio_element.play();

    setFrozenTotal(prev => (prev === null ? 
      (showAnswer_A ? Number(question_object.Answer_1_Points) : 0) +
      (showAnswer_B ? Number(question_object.Answer_2_Points) : 0) +
      (showAnswer_C ? Number(question_object.Answer_3_Points) : 0) +
      (showAnswer_D ? Number(question_object.Answer_4_Points) : 0) +
      (showAnswer_E ? Number(question_object.Answer_5_Points) : 0) +
      (showAnswer_F ? Number(question_object.Answer_6_Points) : 0)
    : prev));
  
    set_showAnswer_A(true)
    set_showAnswer_B(true)
    set_showAnswer_C(true)
    set_showAnswer_D(true)
    set_showAnswer_E(true)
    set_showAnswer_F(true)
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
        <div className="pointsCalculator">{totalPoints}</div>
        <AnswerBox answerID="A" answerValue={question_object.Answer_1} answerPoints={question_object.Answer_1_Points} showAnswerValue={showAnswer_A} setShowAnswerValue={set_showAnswer_A} />
        <AnswerBox answerID="B" answerValue={question_object.Answer_2} answerPoints={question_object.Answer_2_Points} showAnswerValue={showAnswer_B} setShowAnswerValue={set_showAnswer_B} />
        <AnswerBox answerID="C" answerValue={question_object.Answer_3} answerPoints={question_object.Answer_3_Points} showAnswerValue={showAnswer_C} setShowAnswerValue={set_showAnswer_C} />
        <AnswerBox answerID="D" answerValue={question_object.Answer_4} answerPoints={question_object.Answer_4_Points} showAnswerValue={showAnswer_D} setShowAnswerValue={set_showAnswer_D} />
        <AnswerBox answerID="E" answerValue={question_object.Answer_5} answerPoints={question_object.Answer_5_Points} showAnswerValue={showAnswer_E} setShowAnswerValue={set_showAnswer_E} />
        <AnswerBox answerID="F" answerValue={question_object.Answer_6} answerPoints={question_object.Answer_6_Points} showAnswerValue={showAnswer_F} setShowAnswerValue={set_showAnswer_F} />
      </div>
      <div className="gameMenuDiv">
        <div className="xCounterDisplay">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} style={{ color: i < xCount ? '#B3281E' : '#808080' }}>
              X
            </span>
          ))}
        </div>     
        <GameButton title='Incorrect "X"' clickAction={action_displayX} bgColor="#B3281E" />
        <GameButton title="Undo X" clickAction={action_undoX} bgColor="#FF8800" />   {/* ✅ Added */}
        <GameButton title="Show All Answers" clickAction={action_showAllAnswers} bgColor="#066F6A" />
        <GameButton title="New Question" clickAction={action_newQuestion} bgColor="#000000" />
      </div>
      {
        showX && (
          <div className="xSymbolsContainer">
            {Array.from({ length: xCount }, (_, i) => (
              <img key={i} className='xSymbol' src={x_sign} alt={`X Symbol ${i + 1}`} />
            ))}
          </div>
        )
      }
    </div >
  )
}

export default RoundOfGame