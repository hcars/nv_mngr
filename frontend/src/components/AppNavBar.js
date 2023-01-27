import React, { Component } from 'react';
import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import "../styles/AppNavBar.css";


function LoggedIn(props){
  const { user, logoutUser } = useContext(AuthContext);

    if (user){
    return (
        <ul className="navbar-nav">
          <li className="nav-item active">
              <a className="nav-link" href="/">Items</a>
          </li>
          <li className="nav-item active">
              <a className="nav-link" href="/user_items">My Items</a>
          </li>
          <li className="nav-item active">
              <a className="nav-link" href="/add">Add Item</a>
          </li>
          <li className="nav-item">
            {<UserInfo user={user} />}
          </li>
          <li className='nav-item'>
          <a className='nav-link' onClick={logoutUser}>Logout</a>
          </li>
        </ul>
      );
    }
    else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item active">
              <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">Register</a>
          </li>
        </ul>
      );
    }
}

class AppNavBar extends Component {

  // componentDidMount() {
  //   axios.get("http://localhost:8080/current_user/")
  //     .then(res => {
  //       console.log(res.data);
  //       this.setState({
  //         username: res.data.username,
  //         authenticated: res.data.authenticated
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }



  render() {
      return (
        <nav className="navbar sticky-top navbar-light bg-light">
            <LoggedIn/>
        </nav>
      );
    }
  }

  export default AppNavBar;