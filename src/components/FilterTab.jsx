import React from "react";
import Flex from "./baseComponents/flexContainer/Flex";
import IconList from "./IconList";
import Label from "./Label";
import { urgencyLevels, categories } from "./../appConstants";

export default function FilterTab(props) {
  const filters = urgencyLevels.concat(categories);
  return (
    <Flex className="filter">
      <IconList
        icons={filters}
        size="sm"
        selectedId={props.activeFilter}
        handleClick={props.onFilterChange}
        containerClass="filtericons"
      />
      <Label name="Filter Todos" />
    </Flex>
  );
}
