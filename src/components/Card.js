import './Card.css'
import React from 'react'

export default function Card({ card, handleSet, flipped, disabled }) {

    const handleClick = () => {
        if(!disabled){
            handleSet(card)
        }
    }
    return (
        <div className="card" >
            <div className={flipped ? "flipped" : "" }>
                <img className="front" src={card.src} alt="card front" />
                <img 
                    className="back" 
                    src="/cards_img/cover.png" 
                    onClick={handleClick} 
                    alt="card back" />
            </div>
        </div>

    )
}
