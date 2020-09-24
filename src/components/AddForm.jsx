import React from "react";
import { urgencyLevels, categories } from "./../appConstants";
import Flex from "./baseComponents/flexContainer/Flex";
import Label from "./Label";
import Button from "./baseComponents/button/Button";

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

export default class AddForm extends React.Component {
  constructor(props) {
    super();
    this.input = React.createRef();
    this.urgency = React.createRef();
    this.category = React.createRef();
  }

  handleClick = (e) => {
    e.preventDefault();
    const input = this.input.current.value;
    const urgency = this.urgency.current.value;
    const category = this.category.current.value;

    if (input !== "") this.props.onSubmit(input, urgency, category);

    this.input.current.value = "";
    this.urgency.current.value = "1";
    this.category.current.value = "1";
  };

  render() {
    return (
      <Flex type="col" className="addForm">
        <Flex className="addForm__banner">
          <h1 className="bannerInner">Create Todo</h1>
        </Flex>
        <form className="addForm__form" onSubmit={this.handleClick}>
          <input
            ref={this.input}
            type="text"
            placeholder="Add your todo ..."
            className="addForm__message"
          />
          <GetSelect
            name="Urgency"
            selectRef={this.urgency}
            className="addForm__select"
            options={urgencyLevels}
          />
          <GetSelect
            name="Category"
            selectRef={this.category}
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
}
