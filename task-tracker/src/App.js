import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import UserList from './components/UserList';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    setTasks(response.data);
  };

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
    setCurrentUser(response.data[0]);
  };

  const addTask = async (task) => {
    await axios.post('http://localhost:5000/tasks', task);
    fetchTasks();
  };

  const toggleComplete = async (id) => {
    const taskToToggle = tasks.find(task => task.id === id);
    const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed, completedBy: taskToToggle.completed ? null : currentUser };
    await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
    fetchTasks();
  };

  const editTask = async (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    const newTitle = prompt("Upravit název úkolu:", taskToEdit.title);
    const newDescription = prompt("Upravit popis úkolu:", taskToEdit.description);
    const newDueDate = new Date(prompt("Upravit termín úkolu (yyyy-MM-ddTHH:mm):", taskToEdit.dueDate));
    const updatedTask = { ...taskToEdit, title: newTitle, description: newDescription, dueDate: newDueDate };
    await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  const addUser = async () => {
    const newUser = prompt("Zadejte jméno nového uživatele:");
    if (newUser) {
      await axios.post('http://localhost:5000/users', { user: newUser });
      fetchUsers();
      setCurrentUser(newUser);
    }
  };

  return (
    <Router>
      <div className="app">
        <header>
          <div className="header-left">
            <Link to="/" className="dashboard-button">
              Správa úkolů
            </Link>
            <Link to="/dashboard" className="dashboard-button">
              Dashboard
            </Link>
          </div>
          <div className="header-center">
            <h1>TaskTracker</h1>
          </div>
          <UserList 
            users={users} 
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser} 
            addUser={addUser}
          />
        </header>
        <main>
          <Switch>
            <Route path="/dashboard">
              <Dashboard tasks={tasks} />
            </Route>
            <Route path="/">
              <>
                <TaskForm addTask={addTask} />
                <TaskList 
                  tasks={tasks} 
                  toggleComplete={toggleComplete} 
                  editTask={editTask} 
                  deleteTask={deleteTask} 
                />
              </>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
