import React from "react";
import BtnList from "./BtnList";

export default function BulkTools(props) {
  const controls = [
    {
      type: "disk",
      theme: "passive",
      className: "tool tool__complete",
      size: "md",
      innerHTML: "\u2611",
      handleClick: props.onComplete,
    },
    {
      type: "disk",
      theme: "passive",
      className: "tool tool__incomplete",
      size: "md",
      innerHTML: "\u2610",
      handleClick: props.onIncomplete,
    },
    {
      type: "disk",
      theme: "passive",
      className: "tool tool__delete",
      size: "md",
      innerHTML: "\u2612",
      handleClick: props.onDelete,
    },
  ];
  return (
    <div className="toolmenu">
      <BtnList buttons={controls} />
    </div>
  );
}
