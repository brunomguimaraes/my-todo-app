import React, {
    useState,
    useEffect
  } from "react";
  
  import "./styles.css";
  
  const API_URL = "http://localhost:3000/todos"

  function App() {
    const emptyTodo = {
      title: "",
      description: ""
    };
  
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState(emptyTodo);
    const [editing, setEditing] = useState(false);
  
    useEffect(() => {
      fetch(API_URL)
        .then(response =>  response.json())
        .then(todos => setTodos(todos));
  
    }, [newTodo]);
  
    const createTodo = (todo) => {
      setNewTodo(todo);
      addEntry(newTodo);
      setNewTodo(emptyTodo);
    };
  
    const addEntry = (todo) => {
      fetch(API_URL, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-originA
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

    const editEntry = (todo) =>{
      fetch(API_URL + "/" + todo.id, {
        method: 'PUT',
        body: JSON.stringify(todo)
      }).then((response) => {
        response.json().then((response) => {
          console.log(response);
        })
      }).catch(err => {
        console.error(err)
      })
    }
  
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
              <button onClick={() => console.log(todo)}>
                edit
              </button>
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