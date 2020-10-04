import React from "react";
import "./Button.css";

// API
// type - disk/pill
// theme - active/passive
// size - sm/md/lg
// className
// hancleClick
// Children

export default function Button({
  type = "pill",
  theme = "None",
  size = "md",
  className = "",
  handleClick = () => {},
  children = "",
}) {
  const btnClass = `btn btn-${size}-${type} btn-${theme} ${className}`;

  return (
    <button className={btnClass} onClick={handleClick}>
      {children}
    </button>
  );
}
