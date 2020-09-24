import React from "react";
import Flex from "./baseComponents/flexContainer/Flex";
import FilterTab from "./FilterTab";
import Analytics from "./Analytics";
import AddForm from "./AddForm";

export default function Sidebar(props) {
  return (
    <Flex type="col" className="sidebar">
      <FilterTab
        activeFilter={props.filter}
        onFilterChange={props.handlers.filter}
      />
      <Analytics todos={props.todos} filter={props.filter} />
      <AddForm onSubmit={props.handlers.add} />
    </Flex>
  );
}
