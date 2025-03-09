import User from "./User";

const UsersList = ({ users, editUser, deleteUser }) => {
  return (
    <div className="container p-0 m-0">
      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          editUser={editUser}
          deleteUser={deleteUser}
        />
      ))}
    </div>
  );
};

export default UsersList;
