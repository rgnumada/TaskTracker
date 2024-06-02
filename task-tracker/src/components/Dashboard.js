import React from 'react';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale/cs';

const Dashboard = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.completed);
  const activeTasks = tasks.filter(task => !task.completed);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h3>Aktivní úkoly</h3>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Název</th>
                <th>Popis</th>
                <th>Termín</th>
              </tr>
            </thead>
            <tbody>
              {activeTasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{format(new Date(task.dueDate), 'PPPP p', { locale: cs })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dashboard-section">
          <h3>Dokončené úkoly</h3>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Název</th>
                <th>Popis</th>
                <th>Termín</th>
                <th>Dokončeno uživatelem</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{format(new Date(task.dueDate), 'PPPP p', { locale: cs })}</td>
                  <td>{task.completedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
