import React, { Component } from "react";
import Flex from "./components/baseComponents/flexContainer/Flex";
import Header from "./components/Header";
import TodoDisplay from "./components/TodoDisplay";
import Sidebar from "./components/Sidebar";
import serverSide from "./backend";

// const todos = [
//   {
//     id: "1",
//     body: "Get the groceries",
//     category: "1",
//     completed: false,
//     urgency: "1",
//     pin: false,
//     timestamp: "22/08/2020, 14:01:29",
//   },
//   {
//     id: "2",
//     body: "Have you created your todo list app yet",
//     category: "2",
//     completed: false,
//     urgency: "3",
//     pin: false,
//     timestamp: "23/08/2020, 17:23:42",
//   },
//   {
//     id: "3",
//     body: "Pick up andrew from ballet class",
//     category: "1",
//     completed: true,
//     urgency: "1",
//     pin: false,
//     timestamp: "29/08/2020, 20:17:05",
//   },
//   {
//     id: "4",
//     body: "Update Instagram. It's been ages",
//     category: "3",
//     completed: true,
//     urgency: "2",
//     pin: true,
//     timestamp: "03/09/2020, 11:45:51",
//   },
// ];

export class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      filter: "NONE",
      detailedTodo: "NONE",
      selectedTodos: [],
      timeline: [[[], "NONE", "NONE"]],
      pointInTime: 0,
    };
    this.server = null;
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
    this.server = serverSide();
    this.server.getAllTodos().then((todos) => {
      this.changeState(
        {
          todos,
        },
        true
      );
    });
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
    this.handleChangeDetail(id, { completed: !targetTodo.completed });
  };

  handleDelete = (id) => {
    this.server.deleteTodo(id).then(() => {
      this.server.getAllTodos().then((todos) => {
        this.changeState(
          {
            todos,
          },
          true
        );
      });
    });
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
    const targetTodo = this.state.todos.find((todo) => todo.id === id);
    const newTodo = { ...targetTodo, ...changeObj };
    this.server.updateTodo(newTodo).then(() => {
      this.server.getAllTodos().then((todos) => {
        this.changeState(
          {
            todos,
            detailedTodo: "NONE",
          },
          true
        );
      });
    });
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

    this.server.updateSelection(newTodos).then(() => {
      this.server.getAllTodos().then((todos) => {
        this.changeState(
          {
            todos,
          },
          true
        );
      });
    });
  };

  handleCompleteSelection = () => {
    this.toggleSelection(true);
  };

  handleIncompleteSelection = () => {
    this.toggleSelection(false);
  };

  handleDeleteSelection = () => {
    this.server.deleteMultiple(this.state.selectedTodos).then(() => {
      this.server.getAllTodos().then((todos) => {
        this.changeState(
          {
            todos,
          },
          true
        );
      });
    });
  };

  handleAdd = (body, urgency, category) => {
    const newTodo = {
      body,
      urgency,
      category,
      completed: false,
      pinned: false,
      timestamp: new Date().toLocaleString(),
    };
    this.server.addTodo(newTodo).then(() => {
      this.server.getAllTodos().then((todos) => {
        this.changeState(
          {
            todos,
          },
          true
        );
      });
    });
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
      <Flex type="col" className="container">
        <Header />
        <Flex type="row" className="main">
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
        </Flex>
      </Flex>
    );
  }
}

export default TodoApp;
