function UserInfo({ user }) {

  if ((user.first_name.length) > 0 && (user.last_name.length > 0)){
  return (
    <div>
      <h1>Welcome, {user.first_name} {user.last_name} ({user.username})</h1>
    </div>
  );

  }
  else {
    return (
      <div>
        <h1>Welcome, {user.username}</h1>
      </div>
    );
  }
}

export default UserInfo;
