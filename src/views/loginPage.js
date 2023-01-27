import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../styles/LoginPage.css"

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <section className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input type="text" id="username" placeholder="Enter Username" />
        </div>
        <div className="form-control">
          <input type="password" id="password" placeholder="Enter Password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginPage;
