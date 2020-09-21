import React from "react";

export default function AnalyticsGraphic(props) {
  const completed = props.completed;
  const total = props.total;
  const progress = Math.floor((completed * 100) / total);
  const radius = 100;
  const circumference = 2*Math.PI * radius;
  const offset = circumference - circumference*progress/100;
  const stroke = radius * 0.2;
  return (
    <div className="analytics__graphic">
      <svg height={2.2*radius} width={2.2*radius} className="progressCircle">
        <circle
          className="progressStroke"  
          stroke="rgb(53, 178, 236)"
          fill="tansparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset }}
          r={radius}
          cx={radius*1.1}
          cy={radius*1.1}
        />
      </svg>
      <div className="analytics__data">
        <div className="analytics__percentage">{`${progress}%`}</div>
        <div className="analytics__ratio">{`${completed} / ${total}`}</div>
      </div>
    </div>
  );
}
