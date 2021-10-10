import React from "react";

const Card = ({img}) => {
    return(
        <div>
            <img src={img} alt="card" style={{display: "inline-block"}} />
        </div>
    )
};

export default Card;