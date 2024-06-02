const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let users = ['Luke Skywalker', 'Darth Vader', 'Han Solo', 'Leia Organa', 'Yoda'];


app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = req.body;
  tasks.push({ id: Date.now(), ...task });
  res.json({ message: 'Task added successfully' });
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTask = req.body;
  tasks = tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task));
  res.json({ message: 'Task updated successfully' });
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.json({ message: 'Task deleted successfully' });
});


app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const user = req.body.user;
  if (users.includes(user)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push(user);
  res.json({ message: 'User added successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
