import './App.css';
import React, {useState, useEffect} from 'react';
import TodoList from './components/TodoList';
import Form from './components/Form';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos]= useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilterTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  },[todos, status])

  const filterHandler = () => {
    switch(status) {
        case 'completed':
          setFilterTodos(todos.filter(item => item.completed === true));
          break;
        case 'uncompleted':
          setFilterTodos(todos.filter(item => item.completed === false));
          break
        default: 
          setFilterTodos(todos);
          break;
    }
  }

  //save to local
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
     const todoLocal = JSON.parse(localStorage.getItem("todos"));
     setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>      
     <Form 
        setInputText={setInputText}
        setTodos={setTodos} 
        todos={todos} 
        inputText={inputText}
        setStatus={setStatus}
        />
     <TodoList inputText={inputText} todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
