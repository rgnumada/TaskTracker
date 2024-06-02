import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { cs } from 'date-fns/locale';

// Registrace české lokalizace
registerLocale('cs', cs);

const TaskForm = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title: taskTitle, description: taskDescription, dueDate: taskDueDate });
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate(new Date());
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={taskTitle} 
        onChange={(e) => setTaskTitle(e.target.value)} 
        placeholder="Název úkolu" 
        required
      />
      <textarea 
        value={taskDescription} 
        onChange={(e) => setTaskDescription(e.target.value)} 
        placeholder="Popis úkolu"
        required
      />
      <DatePicker
        selected={taskDueDate}
        onChange={(date) => setTaskDueDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="dd.MM.yyyy HH:mm"
        locale="cs"
        className="datepicker"
        placeholderText="Vyberte datum a čas"
      />
      <button type="submit">Přidat úkol</button>
    </form>
  );
};

export default TaskForm;
