import React, { useState } from "react";
import Flex from "./baseComponents/flexContainer/Flex";
import IconList from "./IconList";
import BtnList from "./BtnList";
import { urgencyLevels, categories } from "./../appConstants";

export function TodoDetail(props) {
  const [body, setBody] = useState(props.todo.body);
  const [urgency, setUrgency] = useState(props.todo.urgency);
  const [category, setCategory] = useState(props.todo.category);

  const saveChange = () => {
    props.onDetailChange(props.todo.id, { body, urgency, category });
  };

  const controls = [
    {
      type: "pill",
      theme: "active",
      className: "detail__btn",
      size: "sm",
      innerHTML: "Cancel",
      handleClick: props.onClose,
    },
    {
      type: "pill",
      theme: "passive",
      className: "detail__btn",
      size: "sm",
      innerHTML: "Save",
      handleClick: saveChange,
    },
  ];

  const handleUrgencyChange = (id) => {
    setUrgency(id.split("-")[1]);
  };

  const handleCategoryChange = (id) => {
    setCategory(id.split("-")[1]);
  };

  return (
    <Flex className="detailWrapper">
      <Flex className="detail">
        <textarea
          className="detail__body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <IconList
          icons={urgencyLevels}
          size="md"
          selectedId={`ug-${urgency}`}
          handleClick={handleUrgencyChange}
          containerClass="detail__optionContainer"
          iconClassName="detail__option"
        />
        <IconList
          icons={categories}
          size="md"
          selectedId={`ct-${category}`}
          handleClick={handleCategoryChange}
          containerClass="detail__optionContainer"
          iconClassName="detail__option"
        />
        <div className="detail__controls">
          <BtnList buttons={controls} />
        </div>
      </Flex>
    </Flex>
  );
}

export default TodoDetail;
