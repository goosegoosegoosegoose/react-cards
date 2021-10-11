import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Card from "./Card";
const base_url = "http://deckofcardsapi.com/api"

const CardPile = () => {
    const [deck, setDeck] = useState(newDeck);
    const [card, setCard] = useState(null);
    const [num, setNum] = useState(52);
    const [draw, setDraw] = useState(false);
    const drawId = useRef();

    async function newDeck() {
        const res = await axios.get(`${base_url}/deck/new`);
        setDeck(res.data.deck_id);
        setNum(52);
    };

    function startDraw() {
        setNum(num - 1);
        setDraw(true);
    }

    function stopDraw() {
        clearInterval(drawId.current)
        setDraw(false);
    }
    
    useEffect(function fetchCardOnDeckChange() {
        async function fetchCard() {
            const res = await axios.get(`${base_url}/deck/${deck}/draw/?count=1`);

            if (res.data.success === false) {
                clearInterval(drawId.current);
                alert("Error: no cards remaining!")
            } else {
                setCard(res.data.cards[0].image);
                setNum(num - 1);
            }
        };

        const start = () => drawId.current = setInterval(() => {
            fetchCard();
        }, 1000);
        
        if (num < 52) start();
        return (() => clearInterval(drawId.current));
        
    }, [num]);

    return (
        <div>
            {draw ? <button onClick={stopDraw}>Stop Drawing</button> : <button onClick={startDraw}>Start drawing</button>}      
            {card ? <Card img={card} /> : <p>Draw a card</p>}
        </div>
    )
    
}

export default CardPile;