import React from "react";
import TodoDetail from "./TodoDetail";
import TodoList from "./TodoList";
import BulkTools from "./BulkTools";
import { filterTodos } from "./../helperFunction";

export default function TodoDisplay(props) {
  const filteredTodos = filterTodos(props.todos, props.filter);
  const {
    changeDetail,
    closeDetail,
    completeSelection,
    incompleteSelection,
    deleteSelection,
    ...todoHandlers
  } = props.handlers;
  const detailedTodo = props.todos.find(
    (todo) => todo.id === props.detailedTodo
  );
  return (
    <div className="todoDisplay">
      {detailedTodo && (
        <TodoDetail
          todo={detailedTodo}
          onDetailChange={changeDetail}
          onClose={closeDetail}
        />
      )}
      <TodoList
        todos={filteredTodos}
        selectedTodos={props.selectedTodos}
        handlers={todoHandlers}
      />
      <BulkTools
        onComplete={completeSelection}
        onIncomplete={incompleteSelection}
        onDelete={deleteSelection}
      />
    </div>
  );
}
