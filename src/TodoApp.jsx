import React, { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import Flex from "./components/baseComponents/flexContainer/Flex";
import Header from "./components/Header";
import TodoDisplay from "./components/TodoDisplay";
import Sidebar from "./components/Sidebar";
import useTimeline from "./hooks/useTimeline";
import useServer from "./hooks/useServer";

function compareTimestamp(a, b) {
  return Date.parse(a.timestamp) - Date.parse(b.timestamp);
}

function todosReducer(state, { type, payload }) {
  switch (type) {
    case "Add":
      return [...state, payload].sort(compareTimestamp);
    case "Delete":
      return state.filter((item) => item.id !== payload);
    case "Edit":
      return state.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload.updObj };
        }
        return item;
      });
    case "AddMultiple":
      return [...state, ...payload].sort(compareTimestamp);
    case "DeleteMultiple":
      return state.filter((item) => !payload.includes(item.id));
    case "EditMultiple":
      return state.map((item) => {
        if (payload.ids.includes(item.id)) {
          return { ...item, ...payload.updObj };
        }
        return item;
      });
    default:
      return state;
  }
}

export default function TodoApp(props) {
  const [todos, todosDispatch] = useReducer(todosReducer, []);
  const [filter, setFilter] = useState("NONE");
  const [detailedView, setDetailedView] = useState("NONE");
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [addToTimeline] = useTimeline([]);
  const [enhancedDispatch] = useServer(todosDispatch);

  const todoHandlers = {
    complete: handleToggle,
    delete: handleDelete,
    showDetail: setDetailedView,
    closeDetail: setDetailedView.bind(this, "NONE"),
    changeDetail: handleChangeDetail,
    completeSelection: handleToggleMultiple.bind(this, true),
    incompleteSelection: handleToggleMultiple.bind(this, false),
    deleteSelection: handleDeleteMultiple,
    select: handleSelect,
  };

  const sidebarHandlers = {
    filter: handleFilter,
    add: handleAddHelper,
  };

  function getTimelineNode(
    actionType,
    actionPayload,
    counterType,
    counterPayload
  ) {
    return {
      action: () =>
        enhancedDispatch({
          type: actionType,
          payload: actionPayload,
        }),
      counter: () =>
        enhancedDispatch({
          type: counterType,
          payload: counterPayload,
        }),
    };
  }

  function handleFilter(newfil) {
    const newFilter = newfil === filter ? "NONE" : newfil;
    const timelineNode = {
      action: () => setFilter(newFilter),
      counter: () => setFilter(filter),
    };
    timelineNode.action();
    addToTimeline(timelineNode);
  }

  function handleAddHelper(body, urgency, category) {
    const newTodo = {
      id: uuidv4(),
      body,
      urgency,
      category,
      completed: false,
      pinned: false,
      timestamp: new Date().toLocaleString(),
    };
    handleAddTodo(newTodo);
  }

  function handleAddTodo(newTodo) {
    const timelineNode = getTimelineNode("Add", newTodo, "Delete", newTodo.id);
    timelineNode.action();
    addToTimeline(timelineNode);
  }

  function handleDelete(id) {
    const timelineNode = getTimelineNode(
      "Delete",
      id,
      "Add",
      todos.find((todo) => todo.id === id)
    );
    timelineNode.action();
    addToTimeline(timelineNode);
  }

  function handleToggle(id) {
    const targetTodo = todos.find((todo) => todo.id === id);
    handleUpdateDetail(id, { completed: !targetTodo.completed });
  }

  function handleUpdateDetail(id, updObj) {
    const targetTodo = todos.find((todo) => todo.id === id);
    const prevData = {};
    Object.getOwnPropertyNames(updObj).forEach((prop) => {
      prevData[prop] = targetTodo[prop];
    });
    const timelineNode = getTimelineNode(
      "Edit",
      {
        id,
        updObj,
      },
      "Edit",
      {
        id,
        updObj: prevData,
      }
    );
    timelineNode.action();
    addToTimeline(timelineNode);
  }

  function handleChangeDetail(id, updObj) {
    handleUpdateDetail(id, updObj);
    setDetailedView("NONE");
  }

  function handleToggleMultiple(value) {
    const timelineNode = getTimelineNode(
      "EditMultiple",
      {
        ids: selectedTodos,
        updObj: {
          completed: value,
        },
      },
      "EditMultiple",
      {
        ids: selectedTodos,
        updObj: {
          completed: !value,
        },
      }
    );
    timelineNode.action();
    addToTimeline(timelineNode);
  }

  function handleDeleteMultiple() {
    const targetTodos = todos.filter((todo) => selectedTodos.includes(todo.id));
    const timelineNode = getTimelineNode(
      "DeleteMultiple",
      selectedTodos,
      "AddMultiple",
      targetTodos
    );
    timelineNode.action();
    setSelectedTodos("NONE");
    addToTimeline(timelineNode);
  }

  function handleSelect(id) {
    if (id === -1) {
      if (selectedTodos.length > 0) setSelectedTodos([]);
    } else if (selectedTodos.includes(id)) {
      setSelectedTodos((curr) => curr.filter((i) => i !== id));
    } else {
      setSelectedTodos((curr) => [...curr, id]);
    }
  }
  return (
    <Flex type="col" className="container">
      <Header />
      <Flex type="row" className="main">
        <TodoDisplay
          todos={todos}
          filter={filter}
          detailedTodo={detailedView}
          selectedTodos={selectedTodos}
          handlers={todoHandlers}
        />
        <Sidebar todos={todos} filter={filter} handlers={sidebarHandlers} />
      </Flex>
    </Flex>
  );
}
