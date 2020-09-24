import React, { Component } from "react";
import Flex from "./baseComponents/flexContainer/Flex";
import IconList from "./IconList";
import BtnList from "./BtnList";
import { urgencyLevels, categories } from "./../appConstants";

export class TodoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.todo.body,
      urgency: this.props.todo.urgency,
      category: this.props.todo.category,
    };
    this.controls = [
      {
        type: "pill",
        theme: "active",
        className: "detail__btn",
        size: "sm",
        innerHTML: "Cancel",
        handleClick: this.props.onClose,
      },
      {
        type: "pill",
        theme: "passive",
        className: "detail__btn",
        size: "sm",
        innerHTML: "Save",
        handleClick: this.saveChange,
      },
    ];
  }

  saveChange = () => {
    this.props.onDetailChange(this.props.todo.id, this.state);
  };

  handleUrgencyChange = (id) => {
    this.setState({
      urgency: id.split("-")[1],
    });
  };

  handleCategoryChange = (id) => {
    this.setState({
      category: id.split("-")[1],
    });
  };

  render() {
    return (
      <Flex className="detailWrapper">
        <Flex className="detail">
          <textarea
            className="detail__body"
            value={this.state.body}
            onChange={(e) =>
              this.setState({
                body: e.target.value,
              })
            }
          />
          <IconList
            icons={urgencyLevels}
            size="md"
            selectedId={`ug-${this.state.urgency}`}
            handleClick={this.handleUrgencyChange}
            containerClass="detail__optionContainer"
            iconClassName="detail__option"
          />
          <IconList
            icons={categories}
            size="md"
            selectedId={`ct-${this.state.category}`}
            handleClick={this.handleCategoryChange}
            containerClass="detail__optionContainer"
            iconClassName="detail__option"
          />
          <div className="detail__controls">
            <BtnList buttons={this.controls} />
          </div>
        </Flex>
      </Flex>
    );
  }
}

export default TodoDetail;
