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

export const uuid = (function () {
  let uid = 100;
  return function () {
    uid += 1;
    return uid.toString();
  };
})();