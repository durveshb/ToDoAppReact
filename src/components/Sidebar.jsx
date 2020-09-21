import React from "react";
import FilterTab from "./FilterTab";
import Analytics from "./Analytics";
import AddForm from "./AddForm";

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <FilterTab
        activeFilter={props.data.filter}
        onFilterChange={props.onFilterChange}
      />
      <Analytics data={props.data}/>
      <AddForm onAdd={props.onAdd}/>
    </div>
  );
}
