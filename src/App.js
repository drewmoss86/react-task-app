import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header.js'
import Tasks from './components/Tasks.js';
import AddTask from './components/AddTask.js';
import Footer from './components/Footer.js';
import About from './components/About.js';

function App() {
  const [showAddTask, setShowAddTask] = useState()
  const [color, setColor] = useState('green');
  const [btnName, setBtnName] = useState('Add');
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //Fetch all tasks from db.json
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks'); 
    const data = await res.json();
    return data;
  }

  //Fetch single task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`); 
    const data = await res.json();
    return data;
  }
  

  //Delete
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    console.log(`taskToToggle: ${taskToToggle.id}`)
    const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    console.log(`updateTask: ${updateTask.id}`)
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask),     
    })
    const data = await res.json();
    console.log(`data: ${data.reminder}`)
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))    
  }

  //Create
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),     
    })
    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 1000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])

    // setTasks(prevState => [...prevState, newTask])
  }

  const addTaskChangeColor = () => {
    setShowAddTask(!showAddTask);
    setColor(color === 'green' ? 'red' : 'green');
    setBtnName(btnName === 'Add' ? 'Cancel' : 'Add');
  }

  return (
    <Router>
        <div className="container">
          <Header setShowAddTask={addTaskChangeColor} btnColor={color} btnName={btnName} />
          <Routes>
            <Route path='/' element={
              <> 
                {showAddTask && <AddTask addTask={addTask}/>}
                {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggleReminder={toggleReminder} /> : 'No More Tasks!'}
              </>
            } />
            <Route path='/about' element={<About />}/>
          </Routes>       
          <Footer />
        </div>
    </Router>
  );
}

export default App;
