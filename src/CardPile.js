import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";
const base_url = "http://deckofcardsapi.com/api"

const CardPile = () => {
    const [deck, setDeck] = useState(newDeck);
    const [card, setCard] = useState(null);
    const [num, setNum] = useState(52)

    async function newDeck() {
        const res = await axios.get(`${base_url}/deck/new`);
        setDeck(res.data.deck_id);
        setNum(52);
    };

    function draw() {
        setNum(num - 1);
        console.log(num)
    }
    
    useEffect(function fetchCardOnDeckChange() {
        async function fetchCard() {
            const res = await axios.get(`${base_url}/deck/${deck}/draw/?count=1`);
            setCard(res.data.cards[0].image);
        }
        if (num === -1){
            return;
        }
        fetchCard();
    }, [num]);

    return (
        <div>
            {num !== -1 ? <button onClick={draw}>Draw</button> : alert("Error: no cards remaining!")}
            {card ? <Card key={num} img={card} /> : <p>Draw a card</p>}
        </div>
    )
    
}

export default CardPile;