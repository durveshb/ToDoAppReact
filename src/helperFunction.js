export function filterTodos(todos, selectedFilter) {
  const [type, level] = selectedFilter.split("-");
  switch (type) {
    case "ug":
      todos = todos.filter((todo) => todo.urgency === level);
      break;
    case "ct":
      todos = todos.filter((todo) => todo.category === level);
      break;
    default:
      return todos;
  }
  return todos;
}

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

export function getDateString() {
  const currDate = new Date();
  const dateString = `${days[currDate.getDay()]}, ${
    months[currDate.getMonth()]
  } ${currDate.getDate()}`;

  return dateString;
}
