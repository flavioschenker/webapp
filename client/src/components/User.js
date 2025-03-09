import React, { useState } from "react";

const User = ({ user, editUser, deleteUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleSave = () => {
    editUser(editedUser);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  return (
    <div className="row mb-3 p-3 m-0 border shadow">
      {isEditing ? (
        <div className="row">
          <div className="col-9">
            <div className="row">
              <div className="col-4">
                <input
                  type="text"
                  name="firstName"
                  value={editedUser.firstName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  name="lastName"
                  value={editedUser.lastName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <select
                  name="gender"
                  value={editedUser.gender}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="row">
              <div className="col-6">
                <button className="btn btn-success w-100" onClick={handleSave}>
                  Save
                </button>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-secondary w-100"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-9 p-0 d-flex align-items-center">
            <span>
              {user.firstName} {user.lastName}, {user.gender}
            </span>
          </div>
          <div className="col-3">
            <div className="row">
              <div className="col-6">
                <button
                  className="btn btn-warning w-100"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-danger w-100"
                  onClick={() => deleteUser(user)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
