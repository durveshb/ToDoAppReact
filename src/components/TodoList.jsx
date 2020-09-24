import React from "react";
import Todo from "./Todo";

export default function TodoList(props) {
  return (
    <>
      {props.todos.map((todo) => (
        <Todo
          key={todo.id}
          data={todo}
          isSelected={props.selectedTodos.includes(todo.id)}
          handlers={props.handlers}
        />
      ))}
    </>
  );
}