export function createTodoList() {
  const TODO_CURRENT_ID_LS_KEY = "to-do-current-id";
  const toDos_LS = "toDos";

  const savedCurrentId = localStorage.getItem(TODO_CURRENT_ID_LS_KEY);
  let currentId = savedCurrentId ? Number(savedCurrentId) : 1;

  const savedTodos = localStorage.getItem("toDos_LS");
  let toDos = savedTodos
    ? JSON.parse(savedTodos, (key, value) => {
        if (key === "addDate") return new Date(value);
        return value;
      })
    : [
        /* {
      title: "buy Milk",
      isCorrect: false,
      addDate: new Date(),
    },*/
      ];

  function getToDos() {
    return toDos;
  }

  function addToDos(title) {
    if (title.length < 2) {
      throw new Error("todo's title must be at least 2 characters long");
    }
    const newTodo = {
      id: currentId++,
      title,
      isCorrect: false,
      addDate: new Date(),
    };
    toDos = [...toDos, newTodo];
    toDos.sort((a, b) => Number(a.isCorrect) - Number(b.isCorrect));
    saveTodo();
    return newTodo;
  }
  function saveTodo() {
    localStorage.setItem("toDos_LS", JSON.stringify(toDos));
    localStorage.setItem(TODO_CURRENT_ID_LS_KEY, currentId);
  }
  //function findToDoIndex(id) {
  // const index = toDos.findIndex((todo) => todo.id === //id);
  // return index === -1 ? null : index;
  //}

  function getToDoById(id) {
    const todo = toDos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error("the id provided is unknown");
    }
    return todo ? todo : null;
  }

  function removeToDos(id) {
    const removed = getToDoById(id);
    toDos = toDos.filter((todo) => todo.id !== id);

    saveTodo();
    return removed;
  }
  function changeToDos(id) {
    toDos = toDos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCorrect: !todo.isCorrect };
      }
      return todo;
    });

    saveTodo();
    return getToDoById(id);
  }
  function removeAll() {
    toDos = [];
    saveTodo();
    return getToDos();
  }
  return {
    removeAll,
    changeToDos,
    removeToDos,
    getToDoById,
    saveTodo,
    addToDos,
    getToDos,
  };
}
