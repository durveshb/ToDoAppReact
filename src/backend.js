import { openDB } from "idb";

export default function serverSide() {
  const database = openDB("TodoBase", 1, {
    upgrade(db) {
      console.log("Making a new TodoBase");
      if (!db.objectStoreNames.contains("TodoStore")) {
        const store = db.createObjectStore("TodoStore", {
          keyPath: "id",
        });
        store.createIndex("timestamp", "timestamp");
      }
    },
  });

  function getAllTodos() {
    return database.then((db) => {
      return db.getAllFromIndex("TodoStore", "timestamp");
    });
  }

  function addTodo(todo) {
    return database.then((db) => {
      const tx = db.transaction("TodoStore", "readwrite");
      const store = tx.objectStore("TodoStore");
      store.add(todo);
      return tx.complete;
    });
  }

  function deleteTodo(id) {
    return database.then((db) => {
      const tx = db.transaction("TodoStore", "readwrite");
      const store = tx.objectStore("TodoStore");
      store.delete(id);
      return tx.complete;
    });
  }

  function updateTodo(newTodo) {
    return database.then((db) => {
      const tx = db.transaction("TodoStore", "readwrite");
      const store = tx.objectStore("TodoStore");
      store.put(newTodo);
      return tx.complete;
    });
  }

  function updateSelection(newTodos) {
    return database.then((db) => {
      const tx = db.transaction("TodoStore", "readwrite");
      const store = tx.objectStore("TodoStore");
      newTodos.forEach((newTodo) => store.put(newTodo));
      return tx.complete;
    });
  }

  function addMultiple(newTodos) {
    return database.then((db) => {
      const tx = db.transaction("TodoStore", "readwrite");
      const store = tx.objectStore("TodoStore");
      newTodos.forEach((newTodo) => store.add(newTodo));
      return tx.complete;
    });
  }

  function deleteMultiple(todoIds) {
    return database.then((db) => {
      const tx = db.transaction("TodoStore", "readwrite");
      const store = tx.objectStore("TodoStore");
      todoIds.forEach((id) => store.delete(id));
      return tx.complete;
    });
  }

  return {
    getAllTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    updateSelection,
    deleteMultiple,
    addMultiple,
  };
}
