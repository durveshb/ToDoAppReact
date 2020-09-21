import React from "react";
import AnalyticsGraphic from "./AnalyticsGraphic";
import Label from "./Label";
import { filterTodos } from "./../helperFunction";

export default function analytics(props) {
  const filteredTodos = filterTodos(props.data.todos, props.data.filter);
  const completed = filteredTodos.filter((todo) => todo.completed).length;
  const total = filteredTodos.length;
  return (
    <div className="analytics">
      <AnalyticsGraphic completed={completed} total={total} />
      <Label name="Analytics" />
    </div>
  );
}
