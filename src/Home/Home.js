import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import './home.css';
import acsa_logo from "../assets/acsa_logo.png"

const Home = () => {
  const [pin, setPin] = useState(() => {
    // Try to load existing pin from localStorage
    const stored = localStorage.getItem('gamePinData');
    if (stored) {
      try {
        const { pin, timestamp } = JSON.parse(stored);
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        // ✅ If still within one day, reuse it
        if (now - timestamp < oneDay) {
          return pin;
        }
      } catch (err) {
        console.error("Invalid localStorage data:", err);
      }
    }

    // Otherwise generate a new 4-digit pin
    const newPin = Math.floor(Math.random() * 9000) + 1000;
    const newData = { pin: newPin, timestamp: Date.now() };
    localStorage.setItem('gamePinData', JSON.stringify(newData));
    return newPin;
  });
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
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button
            onClick={() => {
              const confirmReset = window.confirm(
                "⚠️ You will need to enter the new PIN on the answer sheet site to ensure both stay synchronized.\n\nDo you want to regenerate the PIN?"
              );

              if (!confirmReset) return; // Cancel pressed — do nothing

              const newPin = Math.floor(Math.random() * 9000) + 1000; // 1000–9999 inclusive
              const newData = { pin: newPin, timestamp: Date.now() };
              localStorage.setItem('gamePinData', JSON.stringify(newData));
              setPin(newPin);
            }}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#B3281E',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Regenerate PIN
          </button>

          <div style={{ marginTop: '10px', fontWeight: 'bold', color: '#000' }}>
            Current PIN: {pin}
          </div>
        </div>
      </header>
      <footer>
        <h4>Created by <a href="https://joshumahi.vercel.app/" target="_blank" rel="noopener">Joshua Umahi</a>.</h4>
      </footer>
    </div>
  )
}

export default Home