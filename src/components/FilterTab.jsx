import React from "react";
import Label from "./Label";
import { urgencyLevels, categories } from "./../appConstants";

export default function FilterTab(props) {
  const filters = urgencyLevels.concat(categories);
  const filtericons = filters.map((filter) => {
    const myClass =
      filter.filId === props.activeFilter
        ? "filter__icon filter__icon--selected"
        : "filter__icon";
    return (
      <img
        alt={`Filter icon : ${filter.filId}`}
        key={filter.filId}
        data-filid={filter.filId}
        className={myClass}
        src={filter.src}
        onClick={(e) => {
          props.onFilterChange(e.target.dataset.filid);
        }}
      />
    );
  });
  return (
    <div className="filter">
      <div className="filtericons">{filtericons}</div>
      <Label name="Filter Todos" />
    </div>
  );
}
