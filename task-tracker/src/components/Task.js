import React from 'react';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale/cs';

const Task = ({ task, toggleComplete, editTask, deleteTask }) => {
  return (
    <li className={`task ${task.completed ? 'completed' : ''}`}>
      <div>
        <span className="task-title">{task.title}</span>
        <span className="task-description">{task.description}</span>
        <span className="task-due-date">
          Termín: {format(new Date(task.dueDate), 'PPPP p', { locale: cs })}
        </span>
      </div>
      <div className="task-buttons">
        <button onClick={() => toggleComplete(task.id)}>
          {task.completed ? 'Označit jako nesplněné' : 'Označit jako splněné'}
        </button>
        <button onClick={() => editTask(task.id)}>Upravit</button>
        <button className="delete-button" onClick={() => deleteTask(task.id)}>Smazat</button>
      </div>
      {task.completed && <em>Dokončeno uživatelem: {task.completedBy}</em>}
    </li>
  );
};

export default Task;
