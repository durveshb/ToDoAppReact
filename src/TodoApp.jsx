import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Flex from "./components/baseComponents/flexContainer/Flex";
import Header from "./components/Header";
import TodoDisplay from "./components/TodoDisplay";
import Sidebar from "./components/Sidebar";
import serverSide from "./backend";

export class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      filter: "NONE",
      detailedTodo: "NONE",
      selectedTodos: [],
      timeline: [],
      pointInTime: 0,
    };
    this.server = null;
    this.todoHandlers = {
      complete: this.handleComplete,
      delete: this.handleDelete,
      showDetail: this.handleShowDetail,
      closeDetail: this.handleCloseDetail,
      changeDetail: this.handleChangeDetailHelper,
      select: this.handleSelect,
      completeSelection: this.handleCompleteSelection,
      incompleteSelection: this.handleIncompleteSelection,
      deleteSelection: this.deleteSelectionHelper,
    };
    this.sidebarHandlers = {
      filter: this.handleFilter,
      add: this.handleAddHelper,
    };
  }

  componentDidMount() {
    this.server = serverSide();
    this.server.getAllTodos().then((todos) => {
      this.setState({
        todos,
      });
    });
    window.addEventListener("keydown", this.handleKeypress);
  }

  addToTimeline = (timelineNode) => {
    const newTimeline = [
      ...this.state.timeline.slice(0, this.state.pointInTime),
    ];
    newTimeline.push(timelineNode);
    return newTimeline;
  };

  getTimelinedState = (
    actionType,
    actionParams,
    counterType,
    counterParams
  ) => {
    const timelineNode = {
      action: {
        type: actionType,
        params: actionParams,
      },
      counter: {
        type: counterType,
        params: counterParams,
      },
    };

    return {
      timeline: this.addToTimeline(timelineNode),
      pointInTime: this.state.pointInTime + 1,
    };
  };

  handleFilter = (filter, isRegistered = true) => {
    const newFilter = filter === this.state.filter ? "NONE" : filter;

    const timelinedState = isRegistered
      ? this.getTimelinedState("FilChange", [newFilter], "FilChange", [
          this.state.filter,
        ])
      : {};

    this.setState({
      filter: newFilter,
      ...timelinedState,
    });
  };

  handleAddHelper = (body, urgency, category) => {
    const newTodo = {
      id: uuidv4(),
      body,
      urgency,
      category,
      completed: false,
      pinned: false,
      timestamp: new Date().toLocaleString(),
    };
    this.handleAdd(newTodo);
  };

  handleAdd = (newTodo, isRegistered = true) => {
    this.server.addTodo(newTodo).then(() => {
      this.server.getAllTodos().then((todos) => {
        const timelinedState = isRegistered
          ? this.getTimelinedState("Add", [newTodo], "Delete", [newTodo.id])
          : {};
        this.setState({
          todos,
          ...timelinedState,
        });
      });
    });
  };

  handleDelete = (id, isRegistered = true) => {
    this.server.deleteTodo(id).then(() => {
      this.server.getAllTodos().then((todos) => {
        const deletedTodo = this.state.todos.find((todo) => todo.id === id);
        const timelinedState = isRegistered
          ? this.getTimelinedState("Delete", [id], "Add", [deletedTodo])
          : {};
        this.setState({
          todos,
          ...timelinedState,
        });
      });
    });
  };

  handleComplete = (id) => {
    const targetTodo = this.state.todos.find((todo) => todo.id === id);
    this.handleChangeDetailHelper(id, { completed: !targetTodo.completed });
  };

  handleShowDetail = (id) => {
    this.setState({
      detailedTodo: id,
    });
  };

  handleCloseDetail = () => {
    this.setState({
      detailedTodo: "NONE",
    });
  };

  handleChangeDetailHelper = (id, changeObj) => {
    const targetTodo = this.state.todos.find((todo) => todo.id === id);
    const newTodo = { ...targetTodo, ...changeObj };
    this.handleChangeDetail(newTodo, targetTodo);
  };

  handleChangeDetail = (newTodo, oldTodo, isRegistered = true) => {
    this.server.updateTodo(newTodo).then(() => {
      this.server.getAllTodos().then((todos) => {
        const timelinedState = isRegistered
          ? this.getTimelinedState("Edit", [newTodo, oldTodo], "Edit", [
              oldTodo,
              newTodo,
            ])
          : {};
        this.setState({
          todos,
          detailedTodo: "NONE",
          ...timelinedState,
        });
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

  editMultiple = (newTodos, isRegistered = true) => {
    this.server.updateSelection(newTodos).then(() => {
      this.server.getAllTodos().then((todos) => {
        const timelinedState = isRegistered
          ? this.getTimelinedState("EditMultiple", [todos], "EditMultiple", [
              [...this.state.todos],
            ])
          : {};
        this.setState({
          todos,
          selectedTodos: [],
          ...timelinedState,
        });
      });
    });
  };

  addMultiple = (todos) => {
    this.server.addMultiple(todos).then(() => {
      this.server.getAllTodos().then((todos) => {
        this.setState({
          todos,
          selectedTodos: [],
        });
      });
    });
  };

  toggleSelection = (value) => {
    let newTodos = this.state.todos.map((todo) => {
      if (this.state.selectedTodos.includes(todo.id)) {
        return { ...todo, completed: value };
      }
      return todo;
    });

    this.editMultiple(newTodos);
  };

  handleCompleteSelection = () => {
    this.toggleSelection(true);
  };

  handleIncompleteSelection = () => {
    this.toggleSelection(false);
  };

  deleteSelectionHelper = () => {
    this.deleteMultiple([...this.state.selectedTodos]);
  };

  deleteMultiple = (selectedTodoIds, isRegistered = true) => {
    this.server.deleteMultiple(selectedTodoIds).then(() => {
      this.server.getAllTodos().then((todos) => {
        const selectedTodos = this.state.todos.filter((todo) =>
          selectedTodoIds.includes(todo.id)
        );
        const timelinedState = isRegistered
          ? this.getTimelinedState(
              "DeleteMultiple",
              [selectedTodoIds],
              "AddMultiple",
              [selectedTodos]
            )
          : {};
        this.setState({
          todos,
          selectedTodos: [],
          ...timelinedState,
        });
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
    const { counter } = this.state.timeline[prevPoint];

    this.setState({
      pointInTime: prevPoint,
    });
    this.dispatch(counter);
  };

  handleRedo = () => {
    if (this.state.pointInTime >= this.state.timeline.length) return;
    const pointInTime = this.state.pointInTime;
    const { action } = this.state.timeline[pointInTime];

    this.setState({
      pointInTime: pointInTime + 1,
    });
    this.dispatch(action);
  };

  dispatch = ({ type, params }) => {
    switch (type) {
      case "Delete":
        this.handleDelete(...params, false);
        break;
      case "Add":
        this.handleAdd(...params, false);
        break;
      case "Edit":
        this.handleChangeDetail(...params, false);
        break;
      case "AddMultiple":
        this.addMultiple(...params);
        break;
      case "DeleteMultiple":
        this.deleteMultiple(...params, false);
        break;
      case "EditMultiple":
        this.editMultiple(...params, false);
        break;
      case "FilChange":
        this.handleFilter(...params, false);
        break;
      default:
    }
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
