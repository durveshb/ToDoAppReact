import React, { Component } from "react";
import Header from "./components/Header";
import TodoDisplay from "./components/TodoDisplay";
import Sidebar from "./components/Sidebar";
import {uuid} from "./helperFunction";
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
  constructor(props) {
    super(props);
    this.state = {
      todos: todos,
      filter: "NONE",
    };
  }

  handleFilter = (filter) => {
    this.setState((state) => ({
      filter: filter === state.filter ? "NONE" : filter,
    }));
  };

  handleComplete = (id) => {
    const targetIndex = this.state.todos.findIndex((todo) => todo.id === id);
    const newTodo = {
      ...this.state.todos[targetIndex],
      completed: !this.state.todos[targetIndex].completed,
    };
    const newTodos = this.state.todos
      .slice(0, targetIndex)
      .concat(newTodo, this.state.todos.slice(targetIndex + 1));

    this.setState({
      todos: newTodos,
    });
  };

  handleDelete = (id) => {
    const newTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({
      todos: newTodos,
    });
  };

  handleDetail = (id) => {};

  handleSelect = (id) => {};

  handleAdd = (body,urgency,category) => {
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
    this.setState({
      todos: newTodos
    })
  }

  render() {
    const handlers = {
      complete: this.handleComplete,
      delete: this.handleDelete,
      detail: this.handleDetail,
      select: this.handleSelect,
    };
    return (
      <div className="container">
        <Header />
        <div className="main">
          <TodoDisplay data={this.state} handlers={handlers} />
          <Sidebar data={this.state} onFilterChange={this.handleFilter} onAdd={this.handleAdd}/>
        </div>
      </div>
    );
  }
}

export default TodoApp;
