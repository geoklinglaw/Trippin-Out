import React from "react";
import { Card } from "antd";

function SuggLocations(props) {
  const truncateWords = (text) => {
    const words = text.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return text;
  };

  const renderPrice = (price) => {
    let priceIndicator = "$$$";
    return (
      <span style={{ color: price ? 'black' : '#808080' }}>
        {price ? priceIndicator.slice(0, price) : priceIndicator}
      </span>
    );
  };
  
  return (
    <div>
        <div>
            <Card className="product" style={{ width: "350px", margin: "15px" }}>
            <input
                style={{ position: "absolute", top: "10px", right: "10px" }}
                type="checkbox"
                checked={props.selected}
                onChange={() => props.toggleSelected(props)} // passes locationId out to toggleSelected in suggestedLocations.js
            />
            <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
                <img
                src={props.photo ? props.photo.prefix + props.photo.width + 'x' + props.photo.height + props.photo.suffix : ""}
                alt={props.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>
            <h2 style={{ marginTop: "13px" }}>{props.name}</h2>
            <p>{truncateWords(props.formatted_address)}</p>
            <p>{renderPrice(props.price)}</p>
            </Card>
        </div>
    </div>
  );
}

export default SuggLocations;

