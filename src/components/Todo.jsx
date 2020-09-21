import React from "react";
import { urgencyLevels, categories } from "./../appConstants";

export default function Todo(props) {
  const todoClass = props.data.completed ? "todo todo--completed" : "todo";
  return (
    <div className={todoClass} data-elemtype="todo" data-elemid={props.data.id}>
      <div className="todo__body">{props.data.body}</div>
      <div className="todo__timestamp">{props.data.timestamp}</div>
      <div className="todo__features">
        <img
          src={
            urgencyLevels.find((level) => level.value === props.data.urgency)
              .src
          }
          className="todo__featureImg"
        />
        <img
          src={
            categories.find((level) => level.value === props.data.category).src
          }
          className="todo__featureImg"
        />
      </div>
      <div className="todo__markComplete" onClick={()=>{
          props.handlers.complete(props.data.id)
      }}>Mark Complete</div>
      <div className="todo__deleteBtn" onClick={()=>{
          props.handlers.delete(props.data.id)
      }}>&times;</div>
      <div className="todo__detailBtn" onClick={()=>{
          props.handlers.detail(props.data.id)
      }}>&#9998;</div>
      <div className="todo__selectionBtn" onClick={()=>{
          props.handlers.select(props.data.id)
      }}></div>
    </div>
  );
}
