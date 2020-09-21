import React from "react";
import Todo from "./Todo";
import {filterTodos} from "./../helperFunction";

export default function TodoDisplay(props) {
  const filteredTodos = filterTodos(props.data.todos, props.data.filter);
  return (
    <div className="todoDisplay">
      {filteredTodos.map((todo) => (
        <Todo key={todo.id} data={todo} handlers={props.handlers}/>
      ))}
    </div>
  );
}
