import React from "react";
import TodoFeatures from "./TodoFeatures";
import BtnList from "./BtnList";

export default function Todo(props) {
  let todoClass = "todo";
  todoClass += props.data.completed ? " todo--completed" : "";
  todoClass += props.isSelected ? " todo--selected" : "";

  const controls = [
    {
      type: "pill",
      theme: "active",
      className: "btn-complete",
      size: "md",
      innerHTML: props.data.completed ? "Completed. Undo?" : "Mark Complete",
      handleClick: () => {
        props.handlers.complete(props.data.id);
      },
    },
    {
      type: "disk",
      theme: "active",
      className: "btn-delete",
      innerHTML: "\u2612",
      handleClick: () => {
        props.handlers.delete(props.data.id);
      },
    },
    {
      type: "disk",
      theme: "active",
      className: "btn-detail",
      innerHTML: "\u270E",
      handleClick: () => {
        props.handlers.showDetail(props.data.id);
      },
    },
    {
      type: "disk",
      className: "btn-select",
      size: "sm",
      handleClick: () => {
        props.handlers.select(props.data.id);
      },
    },
  ];
  return (
    <div className={todoClass} data-elemtype="todo" data-elemid={props.data.id}>
      <div className="todo__body">{props.data.body}</div>
      <div className="todo__timestamp">{props.data.timestamp}</div>
      <TodoFeatures
        urgency={props.data.urgency}
        category={props.data.category}
      />
      <BtnList buttons={controls} />
    </div>
  );
}
