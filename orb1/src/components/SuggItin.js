import React from "react";
import { Card } from "antd";

function SuggItin(props) {
  const truncateWords = (text) => {
    const words = text.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return text;
  };

  return (
    <Card className="product" style={{ width: "350px", margin: "15px" }}>
      <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
        <img
          src={props.pic}
          alt={props.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <h2 style={{ marginTop: "13px" }}>{props.title}</h2>
      <p>{truncateWords(props.description)}</p>
    </Card>
  );
}

export default SuggItin;
