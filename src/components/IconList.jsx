import React from "react";
import Icon from "./baseComponents/icon/Icon";

export default function IconList(props) {
  const className = props.iconClassName || "";
  return (
    <div className={props.containerClass}>
      {props.icons.map((icon) => (
        <Icon
          key={icon.id}
          className={className}
          size={props.size}
          id={icon.id}
          src={icon.src}
          isSelected={props.selectedId === icon.id}
          handleClick={props.handleClick}
        />
      ))}
    </div>
  );
}
