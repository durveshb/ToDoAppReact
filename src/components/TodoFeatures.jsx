import React from "react";
import { urgencyLevels, categories } from "./../appConstants";

export default function TodoFeatures(props) {
  return (
    <div className="todo__features">
      <img
        alt="Urgency Icon"
        src={urgencyLevels.find((level) => level.value === props.urgency).src}
        className="todo__featureImg"
      />
      <img
        alt="Category Icon"
        src={categories.find((level) => level.value === props.category).src}
        className="todo__featureImg"
      />
    </div>
  );
}
