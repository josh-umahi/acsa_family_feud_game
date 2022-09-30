import React from 'react'

const GameButton = ({ title, clickAction, bgColor }) => {
    return (
        <button className='gameButton'
            style={{ backgroundColor: bgColor }}
            onClick={() => clickAction()}
        >
            {title}
        </button >
    )
}

export default GameButton