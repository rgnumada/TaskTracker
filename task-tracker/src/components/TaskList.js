import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, toggleComplete, editTask, deleteTask }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <Task 
          key={task.id} 
          task={task} 
          toggleComplete={toggleComplete} 
          editTask={editTask} 
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
