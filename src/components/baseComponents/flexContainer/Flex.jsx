import React from "react";
import "./flex.css";

export default function Flex({ type = "colc", className = "", children }) {
  return <div className={`flex-${type} ${className}`}>{children}</div>;
}
