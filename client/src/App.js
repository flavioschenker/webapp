import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch users from the server
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Create or update a user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      // If editing an existing user
      await axios.put(`http://localhost:5000/user/${currentUserId}`, { firstName, lastName });
      setEditing(false);
    } else {
      // If creating a new user
      await axios.post('http://localhost:5000/user', { firstName, lastName });
    }
    setFirstName('');
    setLastName('');
    fetchUsers();
  };

  // Edit an existing user
  const handleEdit = (user) => {
    setFirstName(user.name);
    setLastName(user.age);
    setEditing(true);
    setCurrentUserId(user.id);
  };

  // Delete a user
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/user/${id}`);
    fetchUsers();
  };

  return (
    <div className="App">
     
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <button type="submit">{editing ? 'Update User' : 'Add User'}</button>
      </form>

      <h2>Database</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.firstName} {user.lastName}</span>
            <div>

              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
