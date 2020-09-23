import React from "react";
import Todo from "./Todo";
import TodoDetail from "./TodoDetail";
import BulkTools from "./BulkTools";
import { filterTodos } from "./../helperFunction";

export default function TodoDisplay(props) {
  const filteredTodos = filterTodos(props.data.todos, props.data.filter);
  const handlers = props.handlers;

  const detailedTodo = props.data.todos.find(
    (todo) => todo.id === props.data.detailedTodo
  );

  return (
    <div className="todoDisplay">
      {detailedTodo && (
        <TodoDetail
          todo={detailedTodo}
          onDetailChange={handlers.changeDetail}
          onClose={handlers.closeDetail}
        />
      )}
      {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          data={todo}
          isSelected={props.data.selectedTodos.includes(todo.id)}
          handlers={handlers}
        />
      ))}
      <BulkTools
        onComplete={handlers.completeSelection}
        onIncomplete={handlers.incompleteSelection}
        onDelete={handlers.deleteSelection}
      />
    </div>
  );
}
