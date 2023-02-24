import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card'

const cardImages = [
  { "src": "/cards_img/club.png", matched:false },
  { "src": "/cards_img/diamond.jpg", matched:false },
  { "src": "/cards_img/hearts.png", matched:false },
  { "src": "/cards_img/spades.png", matched:false },
]


function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const [cardOne, setCardOne] = useState(null)
  const [cardTwo, setCardTwo] = useState(null)
  const [disabled,setDisabled]=useState(false)

  //shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCardOne(null)
    setCardTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }

  
  // console.log(cards,turns)
  //handle sets
  const handleSet = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card)
  }


  useEffect(()=>{
    
    if(cardOne && cardTwo){
      setDisabled(true)
      if(cardOne.src === cardTwo.src)
      {
        // console.log("Matched")
        
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src=== cardOne.src){
              return {...card,matched:true}
            }
            else{
              return card
            }
          })
        })
        
        resetCards()
      }
      else{
        // console.log("Not Matched")

        setTimeout(() => resetCards(),1000)
      }
    }
  },[cardOne,cardTwo])

  console.log(cards)

  const resetCards = () => {
    setCardOne(null)
    setCardTwo(null)
    setTurns(prevTurns => prevTurns +1) 
    setDisabled(false)      
  }

  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Storm the Brain</h1>
      {/* <img className="back" src="cards_img/cover.png" alt="not found"/>  */}
      <button onClick={shuffleCards}> New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleSet={handleSet}
            flipped={card === cardOne || card.matched === true || card===cardTwo}
            disabled = {disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
