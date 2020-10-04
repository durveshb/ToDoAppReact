import { useRef, useEffect } from "react";
import serverSide from "./../backend";

// sets up the initail connect with the database as soon as it recieves a dispatch.
// returns an enhanced version of dispath which makes server calls in the background.

export default function useServer(dispatch) {
  const myServer = useRef(null);
  useEffect(() => {
    myServer.current = serverSide();
    myServer.current.getAllTodos().then((todos) =>
      dispatch({
        type: "AddMultiple",
        payload: todos,
      })
    );
  }, [dispatch]);

  function enhancedDispatch(args) {
    switch (args.type) {
      case "Add":
        myServer.current.addTodo(args.payload);
        break;
      case "Delete":
        myServer.current.deleteTodo(args.payload);
        break;
      case "Edit":
        myServer.current.updateTodo(args.payload.id, args.payload.updObj);
        break;
      case "AddMultiple":
        myServer.current.addMultiple(args.payload);
        break;
      case "DeleteMultiple":
        myServer.current.deleteMultiple(args.payload);
        break;
      case "EditMultiple":
        myServer.current.updateSelection(args.payload.ids, args.payload.updObj);
        break;
      default:
        break;
    }
    dispatch(args);
  }

  return [enhancedDispatch];
}
