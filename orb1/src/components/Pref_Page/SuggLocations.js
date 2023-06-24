import React from "react";
import { Card } from "antd";
// import './SuggLocations.css'; // For custom styles

function SuggLocations(props) {
  const truncateWords = (text) => {
    const words = text.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return text;
  };

  const goToLink = () => {
    // Navigate to the link or perform some action
  };

  const renderPrice = (price) => {
    let priceIndicator = "$$$";
    return (
      <span style={{ color: price ? 'black' : 'lightgrey' }}>
        {priceIndicator.slice(0, price || 0)}
      </span>
    );
  };

  return (
    <Card className="product" style={{ width: "350px", margin: "15px" }} onClick={goToLink}>
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
      <p>Rating: {props.rating}</p>
    </Card>
  );
}

export default SuggLocations;

