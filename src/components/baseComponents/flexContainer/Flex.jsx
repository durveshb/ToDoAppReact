import React from "react";
import "./flex.css";

export default function Flex(props) {
  const className = `flex-${props.type} ${props.className}`;
  return <div className={className}>{props.children}</div>;
}

Flex.defaultProps = {
  type: "colc",
  className: "",
};
