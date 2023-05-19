import React from "react";

function SuggItin(props) {
    // const title = props.title
    // const price = props.price
    // const desc = props.description
    return (
        <article className="product">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </article>
        
    );
}

export default SuggItin;