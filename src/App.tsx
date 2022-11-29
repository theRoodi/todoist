import React from 'react';
import './App.css';
import {TasksType, TodoList} from './TodoList';

function App() {

    const tasks: Array<TasksType> = [
        {id: 1, title: 'One', isDone: true},
        {id: 2, title: 'Two', isDone: true},
        {id: 3, title: 'Three', isDone: false},
    ]

  return (
    <div className="App">
      <TodoList title={"Learn that"} tasks={tasks}/>
    </div>
  );
}

export default App;
