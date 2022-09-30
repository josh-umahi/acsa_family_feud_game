import React, { useState } from 'react'
import { useParams } from "react-router-dom";

import './style.css';
import database from "../database.js"

const RoundOfGame = () => {
    const { id } = useParams();
    const [question_number] = useState(parseInt(id))
    const [question_index] = useState(parseInt(id) - 1)
    const [question_object] = useState(database[question_index])

    return (
        // TODO: Never use this "&&" notation with a number value because 0 will make it evaluate to false even if that wasn't your intention.
        question_object && <p>{question_object.Question_Title}</p>
    )
}

export default RoundOfGame