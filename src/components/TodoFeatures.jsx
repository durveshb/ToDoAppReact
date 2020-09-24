import React from "react";
import Flex from "./baseComponents/flexContainer/Flex";
import { urgencyLevels, categories } from "./../appConstants";

export default function TodoFeatures(props) {
  return (
    <Flex type="rowc" className="todo__features">
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
    </Flex>
  );
}
