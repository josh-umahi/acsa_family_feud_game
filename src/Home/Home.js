import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import './home.css';
import acsa_logo from "../assets/acsa_logo.png"

const Home = () => {
  const [number_input_entered, set_number_input_entered] = useState(null)
  const navigate = useNavigate();

  const changeQuestion = (question_number_parameter) => {
    const question_number = parseInt(question_number_parameter.trim())
    if (isNaN(question_number) || !Number.isInteger(question_number) || question_number < 1 || question_number > 1000) {
      return
    }

    navigate(`/roundOfGame/${question_number}`);
  }

  return (
    <div className='homeSection'>
      <header>
        <img className='acsaImg' src={acsa_logo} alt="logo" />
        <h1 className='textLogo'>The ACSA Family Feud</h1>
        <form className='input_div' onSubmit={(e) => {
          e.preventDefault()
          changeQuestion(number_input_entered)
        }}>
          <div>
            <input onChange={e => set_number_input_entered(e.target.value)} type="text" placeholder='Enter a number' id="" />
            <button type="submit">submit</button>
          </div>
          <p>Enter a number between 1 and 1,000</p>
        </form>
      </header>
      {/* TODO: Make my name a hyperlink */}
      <footer>
        <h4>Created by <a href="https://joshumahi.vercel.app/" target="_blank" rel="noopener">Joshua Umahi</a>.</h4>
      </footer>
    </div>
  )
}

export default Home