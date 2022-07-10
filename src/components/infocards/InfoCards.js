import React from "react";
import "./InfoCard.css";

const InfoCards = (props) => {
  return (
    <div className="infobox">
      <div className="infobox-title">
        <p>{props.title}</p>
      </div>
      <div className="infobox-text">
        <p>{props.text}</p>
      </div>
      <div className="infobox-content">
        <div className="infobox-data">{props.data}</div>
      </div>
    </div>
  );
};

export default InfoCards;
