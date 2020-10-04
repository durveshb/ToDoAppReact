import React from "react";
import "./icon.css";

export default function Icon({
  size = "md",
  isSelected = false,
  className = "",
  src,
  id,
  handleClick,
}) {
  const iconClass = `icon icon-${size} ${
    isSelected ? "icon--selected" : ""
  } ${className}`;
  return (
    <img
      src={src}
      alt=""
      className={iconClass}
      onClick={() => handleClick(id)}
    />
  );
}
