import React, { useState } from "react";

const UsersForm = ({ addUser }) => {
  const initialState = {
    firstName: "",
    lastName: "",
    gender: "",
    moode: "lel",
  };
  const [user, setUser] = useState(initialState);

  const setUserField = (field, value) => {
    setUser((p) => ({ ...p, [field]: value }));
  };

  const handleSubmit = () => {
    addUser(user);
    setUser(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto mt-5 p-4 border rounded shadow bg-white"
    >
      <div className="row g-2 mb-2">
        <div className="col">
          <div className="form-floating">
            <input
              required
              type="text"
              id="userFirstName"
              placeholder="First Name"
              value={user.firstName}
              onChange={(e) => setUserField("firstName", e.target.value)}
              className="form-control"
            />
            <label for="userFirstName">First Name</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input
              required
              type="text"
              id="userLastName"
              placeholder="Last Name"
              value={user.lastName}
              onChange={(e) => setUserField("lastName", e.target.value)}
              className="form-control"
            />
            <label for="userLastName">Last Name</label>
          </div>
        </div>
      </div>
      <div className="row g-2">
        <div className="col">
          <div className="form-floating">
            <select
              required
              id="userGender"
              value={user.gender}
              onChange={(e) => setUserField("gender", e.target.value)}
              className="form-select mb-4"
            >
              <option value="" selected disabled hidden>
                Choose...
              </option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
            <label for="userGender">Gender</label>
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default UsersForm;
