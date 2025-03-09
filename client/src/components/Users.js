import React, { useState, useEffect } from "react";
import axios from "axios";
import UsersForm from "./UsersForm";
import UsersList from "./UsersList";

const Users = () => {
  const uri = "http://localhost:5000";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("fetch user from useEffect");
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${uri}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (user) => {
    const response = await axios.post(`${uri}/user`, user);
    console.log("fetch user from addUser");

    fetchUsers();
  };

  const editUser = async (user) => {
    const response = await axios.put(`${uri}/user/${user.id}`, user);
    console.log("fetch user from editUser");
    fetchUsers();
  };

  const deleteUser = async (user) => {
    const response = await axios.delete(`${uri}/user/${user.id}`);
    console.log("fetch user from deleteUser");
    fetchUsers();
  };

  return (
    <div className="container p-0">
      <UsersForm addUser={addUser} />
      <hr />
      <UsersList users={users} editUser={editUser} deleteUser={deleteUser} />
    </div>
  );
};

export default Users;
