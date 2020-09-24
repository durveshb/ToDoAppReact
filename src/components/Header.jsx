import React from "react";
import { getDateString } from "./../helperFunction";

export default function Header() {
  return (
    <div className="header">
      <div className="header__calender">{getDateString()}</div>
      <div className="header__logo">To-Do App</div>
    </div>
  );
}
