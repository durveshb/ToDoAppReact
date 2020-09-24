import React from "react";
import Flex from "./baseComponents/flexContainer/Flex";
import Label from "./Label";
import { urgencyLevels, categories } from "./../appConstants";

export default function FilterTab(props) {
  const filters = urgencyLevels.concat(categories);
  const filtericons = filters.map((filter) => {
    const myClass =
      filter.id === props.activeFilter
        ? "filter__icon filter__icon--selected"
        : "filter__icon";
    return (
      <img
        alt={filter.id}
        key={filter.id}
        data-id={filter.id}
        className={myClass}
        src={filter.src}
        onClick={(e) => {
          props.onFilterChange(e.target.dataset.id);
        }}
      />
    );
  });
  return (
    <Flex className="filter">
      <div className="filtericons">{filtericons}</div>
      <Label name="Filter Todos" />
    </Flex>
  );
}
