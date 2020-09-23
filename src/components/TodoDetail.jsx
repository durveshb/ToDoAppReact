import React, { Component } from "react";
import { urgencyLevels, categories } from "./../appConstants";

export class TodoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.todo.body,
      urgency: this.props.todo.urgency,
      category: this.props.todo.category,
    };
  }

  saveChange = () => {
      this.props.onDetailChange(this.props.todo.id, this.state);
  };

  render() {
    return (
      <div className="detailWrapper">
        <div className="detail">
          <textarea
            className="detail__body"
            value={this.state.body}
            onChange={(e) =>
              this.setState({
                body: e.target.value,
              })
            }
          />
          <div className="detail__optionContainer">
            {urgencyLevels.map((level) => (
              <img
                src={level.src}
                alt={level.filId}
                key={level.filId}
                className={
                  this.state.urgency === level.value
                    ? "detail__option detail--selectedOption"
                    : "detail__option"
                }
                onClick={(e) =>
                  this.setState({
                    urgency: level.value,
                  })
                }
              />
            ))}
          </div>
          <div className="detail__optionContainer">
            {categories.map((level) => (
              <img
                src={level.src}
                alt={level.filId}
                key={level.filId}
                className={
                  this.state.category === level.value
                    ? "detail__option detail--selectedOption"
                    : "detail__option"
                }
                onClick={(e) =>
                  this.setState({
                    category: level.value,
                  })
                }
              />
            ))}
          </div>
          <div className="detail__controls">
            <button
              className="detail__btn detailCancelBtn"
              onClick={this.props.onClose}
            >
              Cancel
            </button>
            <button
              className="detail__btn detailSaveBtn"
              onClick={this.saveChange}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoDetail;
