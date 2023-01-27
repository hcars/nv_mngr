import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/ItemDetail.css"

function ItemDetail() {
  let { id } = useParams();
  const [item, setItem] = useState({});
  const history = useHistory();
  const { user } = useContext(AuthContext);
  

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/items/${id}/`)
      .then(res => setItem(res.data))
      .catch(err => console.log(err));
  }, [id]);
  const handleSubmit = () =>
    {
        axios
        .delete(`http://localhost:8000/api/items/${id}/`)
        .then(res => history.push("/user_items"))
        .catch(err => console.log(err));
    }
  


  if ((user) && (user.user_id === item.createdBy)){
    return (
        <div>
        <h1>Name:</h1>
        <p> {item.name}</p>
        <br></br>
        <h2>Description:</h2>
        <p> {item.description}</p>
        <h2>Created By:</h2>
        <p> {item.username}</p>
        <form onSubmit={handleSubmit}>
        <button type="submit" className="delete-button">DELETE</button></form>
        </div>
    );
  }
  else{
    return (
        <div>
        <h1>Name:</h1>
        <p> {item.name}</p>
        <br></br>
        <h2>Description:</h2>
        <p> {item.description}</p>
        <h2>Created By:</h2>
        <p> {item.username}</p>

        </div>
    );
  }
}

export default ItemDetail;
