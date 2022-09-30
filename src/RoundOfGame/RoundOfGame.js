import React, { useState } from 'react'
import { useParams } from "react-router-dom";

import './style.css';
import database from "../database.js"

const RoundOfGame = () => {
    const { id } = useParams();
    const [question_number] = useState(parseInt(id))
    const [question_index] = useState(parseInt(id) - 1)
    const [question_object] = useState(database[question_index])

    console.log(question_object)
    return (
        question_index && <p>{question_object.Question_Title}</p>
    )
}

export default RoundOfGame