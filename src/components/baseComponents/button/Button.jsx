import React from "react";
import "./Button.css";

// API
// type - disk/pill
// theme - active/passive
// size - sm/md/lg
// className
// hancleClick
// Children

export default class Button extends React.Component {
  className = `btn btn-${this.props.size}-${this.props.type} btn-${this.props.theme} ${this.props.className}`;
  render() {
    return (
      <button className={this.className} onClick={this.props.handleClick}>
        {this.props.children}
      </button>
    );
  }
}
Button.defaultProps = {
  type: "pill",
  theme: "",
  size: "md",
  classname: "",
  handleClick: () => {},
  children: "",
};
