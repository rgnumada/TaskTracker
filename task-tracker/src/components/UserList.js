import React from 'react';

const UserList = ({ users, currentUser, setCurrentUser, addUser }) => {
  return (
    <div>
      <select 
        value={currentUser} 
        onChange={(e) => setCurrentUser(e.target.value)} 
        className="user-dropdown"
      >
        {users.map(user => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>
      <button onClick={addUser} className="add-user-button">
        Přidat uživatele
      </button>
    </div>
  );
};

export default UserList;
