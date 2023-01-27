import React from "react";
import "./index.css";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import AppNavBar from "./components/AppNavBar";
import HomePage from "./views/HomePage";
import UserItems from "./views/UserItems";
import AddItem from "./views/addItem";
import ItemDetail from "./views/ItemDetail";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
        <AppNavBar/>
          <Switch>
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={AddItem} path="/add" />
            <Route component={UserItems} path="/user_items" />
            <Route component={ItemDetail} path="/details/:id" />
            <Route component={HomePage} path="/" />
          </Switch>
        </AuthProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
