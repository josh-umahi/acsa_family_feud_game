import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [number_input_entered, set_number_input_entered] = useState(null)
    const navigate = useNavigate();

    const changeQuestion = (question_number_parameter) => {
        const question_number = parseInt(question_number_parameter.trim())
        if (isNaN(question_number) || !Number.isInteger(question_number) || question_number < 1 || question_number > 200) {
            return
        }

        navigate(`/roundOfGame/${question_number}`);
    }

    return (
        <div className='homeSection'>
            <header>
                <h1 className='textLogo'>The ACSA Family Feud</h1>
                <form className='input_div' onSubmit={(e) => {
                    e.preventDefault()
                    changeQuestion(number_input_entered)
                }}>
                    <div>
                        <input onChange={e => set_number_input_entered(e.target.value)} type="text" placeholder='Enter a number' id="" />
                        <button type="submit">submit</button>
                    </div>
                    <p>Enter a number between 1 and 200</p>
                </form>
            </header>
            <footer>
                <h4>Created by Yours Truly.</h4>
                <h4>Yours Truly is me, Joshua Umahi.</h4>
            </footer>
        </div>
    )
}

export default Home