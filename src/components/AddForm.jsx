import React from "react";
import { urgencyLevels, categories } from "./../appConstants";
import Label from "./Label";

export default class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.urgency = React.createRef();
    this.category = React.createRef();
  }

  handleClick = () => {
      const input = this.input.current.value;
      const urgency = this.urgency.current.value;
      const category = this.category.current.value;

      if(input !== "") this.props.onAdd(input, urgency, category);

      this.input.current.value = "";
      this.urgency.current.value = "1";
      this.category.current.value = "1";
  };

  render() {
    return (
      <div className="addForm">
        <div className="addForm__banner">
          <h1 className="bannerInner">Create Todo</h1>
        </div>
        <input
          ref={this.input}
          type="text"
          placeholder="Add your todo ..."
          className="addForm__message"
        />
        <Label name="Urgency" />
        <select ref={this.urgency} name="urgency" className="addForm__select">
          {urgencyLevels.map((level, index) => (
            <option key={index} value={level.value}>
              {level.name}
            </option>
          ))}
        </select>
        <Label name="Category" />
        <select ref={this.category} name="category" className="addForm__select">
          {categories.map((level, index) => (
            <option key={index} value={level.value}>
              {level.name}
            </option>
          ))}
        </select>
        <button className="addForm__submit" onClick={this.handleClick}>
          &#43;
        </button>
      </div>
    );
  }
}
