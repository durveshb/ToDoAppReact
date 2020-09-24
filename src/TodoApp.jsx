import React, { Component } from "react";
import Header from "./components/Header";
import TodoDisplay from "./components/TodoDisplay";
import Sidebar from "./components/Sidebar";
import { uuid } from "./helperFunction";
const todos = [
  {
    id: "1",
    body: "Get the groceries",
    category: "1",
    completed: false,
    urgency: "1",
    pin: false,
    timestamp: "22/08/2020, 14:01:29",
  },
  {
    id: "2",
    body: "Have you created your todo list app yet",
    category: "2",
    completed: false,
    urgency: "3",
    pin: false,
    timestamp: "23/08/2020, 17:23:42",
  },
  {
    id: "3",
    body: "Pick up andrew from ballet class",
    category: "1",
    completed: true,
    urgency: "1",
    pin: false,
    timestamp: "29/08/2020, 20:17:05",
  },
  {
    id: "4",
    body: "Update Instagram. It's been ages",
    category: "3",
    completed: true,
    urgency: "2",
    pin: true,
    timestamp: "03/09/2020, 11:45:51",
  },
];

export class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todos: todos,
      filter: "NONE",
      detailedTodo: "NONE",
      selectedTodos: [],
      timeline: [[todos, "NONE", "NONE"]],
      pointInTime: 0,
    };
    this.todoHandlers = {
      complete: this.handleComplete,
      delete: this.handleDelete,
      showDetail: this.handleShowDetail,
      closeDetail: this.handleCloseDetail,
      changeDetail: this.handleChangeDetail,
      select: this.handleSelect,
      completeSelection: this.handleCompleteSelection,
      incompleteSelection: this.handleIncompleteSelection,
      deleteSelection: this.handleDeleteSelection,
    };
    this.sidebarHandlers = {
      filter: this.handleFilter,
      add: this.handleAdd,
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeypress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeypress);
  }

  changeState = (updatedState, addToTimeline) => {
    const newState = { ...this.state, ...updatedState, selectedTodos: [] };
    if (addToTimeline) {
      newState.pointInTime = newState.pointInTime + 1;
      newState.timeline = [
        ...newState.timeline.slice(0, newState.pointInTime),
        [newState.todos, newState.filter, newState.detailedTodo],
      ];
    }
    this.setState(newState);
  };

  handleFilter = (filter) => {
    const newFilter = filter === this.state.filter ? "NONE" : filter;
    this.changeState(
      {
        filter: newFilter,
      },
      true
    );
  };

  handleComplete = (id) => {
    const targetTodo = this.state.todos.find((todo) => todo.id === id);
    this.handleChangeDetail(id, { completed: !targetTodo.completed }, true);
  };

  handleDelete = (id) => {
    const newTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.changeState(
      {
        todos: newTodos,
      },
      true
    );
  };

  handleShowDetail = (id) => {
    this.changeState(
      {
        detailedTodo: id,
      },
      true
    );
  };

  handleCloseDetail = () => {
    this.changeState(
      {
        detailedTodo: "NONE",
      },
      true
    );
  };

  handleChangeDetail = (id, changeObj) => {
    const targetIndex = this.state.todos.findIndex((todo) => todo.id === id);
    const newTodo = {
      ...this.state.todos[targetIndex],
      ...changeObj,
    };
    const newTodos = this.state.todos
      .slice(0, targetIndex)
      .concat(newTodo, this.state.todos.slice(targetIndex + 1));

    this.changeState(
      {
        todos: newTodos,
        detailedTodo: "NONE",
      },
      true
    );
  };

  handleSelect = (id) => {
    let selectedTodos = [];
    if (id === -1) {
      this.setState({
        selectedTodos,
      });
      return;
    }

    if (this.state.selectedTodos.includes(id)) {
      selectedTodos = this.state.selectedTodos.filter(
        (todoId) => todoId !== id
      );
    } else {
      selectedTodos = [...this.state.selectedTodos, id];
    }
    this.setState({
      selectedTodos,
    });
  };

  toggleSelection = (value) => {
    let newTodos = this.state.todos.map((todo) => {
      if (this.state.selectedTodos.includes(todo.id)) {
        return { ...todo, completed: value };
      }
      return todo;
    });

    this.changeState(
      {
        todos: newTodos,
      },
      true
    );
  };

  handleCompleteSelection = () => {
    this.toggleSelection(true);
  };

  handleIncompleteSelection = () => {
    this.toggleSelection(false);
  };

  handleDeleteSelection = () => {
    let newTodos = this.state.todos.filter(
      (todo) => !this.state.selectedTodos.includes(todo.id)
    );

    this.changeState(
      {
        todos: newTodos,
      },
      true
    );
  };

  handleAdd = (body, urgency, category) => {
    const newTodo = {
      id: uuid(),
      body,
      urgency,
      category,
      completed: false,
      pinned: false,
      timestamp: new Date().toLocaleString(),
    };
    const newTodos = [...this.state.todos, newTodo];
    this.changeState(
      {
        todos: newTodos,
      },
      true
    );
  };

  handleKeypress = (e) => {
    if (!e.shiftKey && e.metaKey && e.key === "z") this.handleUndo();
    else if (e.shiftKey && e.metaKey && e.key === "z") this.handleRedo();
  };

  handleUndo = () => {
    if (this.state.pointInTime <= 0) return;
    const prevPoint = this.state.pointInTime - 1;
    const [prevTodos, prevFilter, prevDetailedTodo] = this.state.timeline[
      prevPoint
    ];

    this.changeState({
      todos: prevTodos,
      filter: prevFilter,
      detailedTodo: prevDetailedTodo,
      pointInTime: prevPoint,
    });
  };

  handleRedo = () => {
    if (this.state.pointInTime >= this.state.timeline.length - 1) return;
    const nextPoint = this.state.pointInTime + 1;
    const [nextTodos, nextFilter, nextDetailedTodo] = this.state.timeline[
      nextPoint
    ];

    this.changeState({
      todos: nextTodos,
      filter: nextFilter,
      detailedTodo: nextDetailedTodo,
      pointInTime: nextPoint,
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <div className="main">
          <TodoDisplay
            todos={this.state.todos}
            filter={this.state.filter}
            detailedTodo={this.state.detailedTodo}
            selectedTodos={this.state.selectedTodos}
            handlers={this.todoHandlers}
          />
          <Sidebar
            todos={this.state.todos}
            filter={this.state.filter}
            handlers={this.sidebarHandlers}
          />
        </div>
      </div>
    );
  }
}

export default TodoApp;
