import React from "react";

function Cards({ image, text, onClick }) {
  return (
    <div className="cards" onClick={onClick}>
      <img src={image} alt={text} />
      <p>{text}</p>
    </div>
  );
}

export default Cards;
