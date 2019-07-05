import React, {
    useState,
    useEffect
  } from "react";
  
  import "./App.css";
  
  function App() {
    const emptyTodo = {
      title: "",
      description: ""
    };
  
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState(emptyTodo);
  
    useEffect(() => {
      fetch("http://localhost:3000/todos")
        .then(response =>  response.json())
        .then(todos => setTodos(todos));
  
    }, [newTodo]);
  
    const createTodo = (todo) => {
      setNewTodo(todo);
      addEntry(newTodo);
      setNewTodo(emptyTodo);
    };
  
    const addEntry = (todo) => {
      fetch("http://localhost:3000/todos", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(todo) // body data type must match "Content-Type" header
      }).then((response) => response.json());
  
      setNewTodo(emptyTodo);
    };
  
    const deleteEntry = (todoId) => {
      fetch("http://localhost:3000/todos/" + todoId, { method: "DELETE" })
        .then((response) => response.json());
    };
  
    const createOnNewTodoChange = (field) => {
      return (e) => {
        setNewTodo({
          ...newTodo,
          [field]: e.target.value
        });
      };
    };
  
    const deleteTodo = (todoIndex) => {
      deleteEntry(todoIndex);
      const remainingTodos = todos.filter(({ id }) => id !== todoIndex);
      setTodos(remainingTodos);
    };
  
    return (
      <div className="App">
        <header className="App-header" />
        <ul>
          {todos && todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} / {todo.description}
              <button onClick={() => deleteTodo(todo.id)}>
                del
              </button>
            </li>
          ))}
        </ul>
        <div>
          <input
            value={newTodo.title}
            onChange={createOnNewTodoChange("title")}
          />
          <input
            value={newTodo.description}
            onChange={createOnNewTodoChange("description")}
          />
          <button onClick={() => createTodo(newTodo)}>add</button>
        </div>
      </div>
    );
  }
  
  export default App;