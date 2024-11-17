import React, { useState } from 'react';

function UserManager() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  // GET - Fetch User
  const getUser = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  // PUT - Update User
  const updateUser = async (id, updates) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const updatedUser = await response.json();
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // DELETE - Delete User
  const deleteUser = async (id) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      });
      setUser(null);
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      {/* Fetch User Form */}
      <div>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID"
        />
        <button onClick={() => getUser(userId)}>
          {loading ? 'Loading...' : 'Get User'}
        </button>
      </div>

      {/* Display User & Actions */}
      {user && (
        <div style={{ margin: '20px' }}>
          <h3>User Details:</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          
          {/* Update User */}
          <button onClick={() => updateUser(user.id, {
            name: 'Updated Name'
          })}>
            Update Name
          </button>

          {/* Delete User */}
          <button 
            onClick={() => deleteUser(user.id)}
            style={{ marginLeft: '10px', backgroundColor: 'red' }}
          >
            Delete User
          </button>
        </div>
      )}
    </div>
  );
}

export default UserManager;