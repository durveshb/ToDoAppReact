import React from "react";
import Flex from "./baseComponents/flexContainer/Flex";
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
      {props.todos.length === 0 ? (
        <Flex className="noTodos">
          You haven't added any todos yet. Got anything on top of your mind?
        </Flex>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
