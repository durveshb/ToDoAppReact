import React, { useRef } from "react";
import { urgencyLevels, categories } from "./../appConstants";
import Flex from "./baseComponents/flexContainer/Flex";
import Label from "./Label";
import Button from "./baseComponents/button/Button";

export default function AddForm(props) {
  const input = useRef(null);
  const urgency = useRef(null);
  const category = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    const inputVal = input.current.value;
    const urgencyVal = urgency.current.value;
    const categoryVal = category.current.value;

    if (inputVal !== "") props.onSubmit(inputVal, urgencyVal, categoryVal);

    input.current.value = "";
    urgency.current.value = "1";
    category.current.value = "1";
  };

  return (
    <Flex type="col" className="addForm">
      <Flex className="addForm__banner">
        <h1 className="bannerInner">Create Todo</h1>
      </Flex>
      <form className="addForm__form" onSubmit={handleClick}>
        <input
          ref={input}
          type="text"
          placeholder="Add your todo ..."
          className="addForm__message"
        />
        <GetSelect
          name="Urgency"
          selectRef={urgency}
          className="addForm__select"
          options={urgencyLevels}
        />
        <GetSelect
          name="Category"
          selectRef={category}
          className="addForm__select"
          options={categories}
        />
        <Button
          type="disk"
          theme="passive"
          size="lg"
          className="addForm__submit"
        >
          &#43;
        </Button>
      </form>
    </Flex>
  );
}

function GetSelect(props) {
  return (
    <>
      <Label name={props.name} />
      <select ref={props.selectRef} className={props.className}>
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}

