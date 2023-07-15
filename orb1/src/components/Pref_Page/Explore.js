import React from "react";
import { Card } from "antd";
import "./Explore.css";
import { tips } from "./traveltips";

const { Meta } = Card;

function Explore() {
  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <h1 className="h1Style">Explore Travel Tips</h1>
      <div className="tips-container">
        {tips.map((tip) => (
          <Card
            className="product"
            key={tip.id}
            onClick={() => tip.url && handleClick(tip.url)}
            cover={tip.img && <img src={tip.img} alt={tip.title}
           />}
            
          >
            <Meta title={tip.title} description={tip.description}/>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Explore;
