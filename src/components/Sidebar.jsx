import React from "react";
import FilterTab from "./FilterTab";
import Analytics from "./Analytics";
import AddForm from "./AddForm";

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <FilterTab
        activeFilter={props.filter}
        onFilterChange={props.handlers.filter}
      />
      <Analytics todos={props.todos} filter={props.filter} />
      <AddForm onSubmit={props.handlers.add} />
    </div>
  );
}
