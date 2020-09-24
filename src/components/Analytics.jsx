import React from "react";
import Flex from "./baseComponents/flexContainer/Flex";
import AnalyticsGraphic from "./AnalyticsGraphic";
import Label from "./Label";
import { filterTodos } from "./../helperFunction";

export default function analytics(props) {
  const filteredTodos = filterTodos(props.todos, props.filter);
  const completed = filteredTodos.filter((todo) => todo.completed).length;
  const total = filteredTodos.length;
  return (
    <Flex className="analytics">
      <AnalyticsGraphic completed={completed} total={total} />
      <Label name="Analytics" />
    </Flex>
  );
}
