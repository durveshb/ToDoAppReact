import React from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Header() {
  const currDate = new Date();
  const calenderInner = `${days[currDate.getDay()]}, ${
    months[currDate.getMonth()]
  } ${currDate.getDate()}`;

  return (
    <div className="header">
      <div className="header__calender">{calenderInner}</div>
      <div className="header__logo">To-Do App</div>
    </div>
  );
}
