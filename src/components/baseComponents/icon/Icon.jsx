import React from "react";
import "./icon.css";

export default function Icon(props) {
  const className = `icon icon-${props.size} ${
    props.isSelected ? "icon--selected" : ""
  } ${props.className}`;
  return (
    <img
      src={props.src}
      alt=""
      className={className}
      onClick={() => props.handleClick(props.id)}
    />
  );
}
Icon.defaultProps = {
  size: "md",
  isSelected: false,
  className: "",
};
