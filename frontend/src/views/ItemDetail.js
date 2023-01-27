import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/ItemDetail.css"



function ItemDetail(props) {
  let { id } = useParams();
  const [item, setItem] = useState({});
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);  

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
        .then(res => {
            if(res.status === 204){
                history.push("/user_items");
            }
            else {
                alert("Failed to Delete!");
            }
        })
        .catch(err => console.log(err));
    };
  
    

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedItem = {
            name: e.target.name.value,
            description: e.target.description.value,
        };
        axios
        .put(`http://localhost:8000/api/items/${id}/`, updatedItem)
        .then(res => {
        if(res.status === 200){
            setEdit(false);
            setItem(res.data);
            alert("Changes Successfully Submitted!");
        }
        else {
            alert("Failed to Update!");
        }
        })
        .catch(err => console.log(err));
    };
    const handleEditClick = () => {
        setEdit(true);
    };

  

    if ((user) && (user.user_id === item.createdBy)){
        if (edit){
            return (
                <form onSubmit={handleEditSubmit}>
                    <h1>Name:</h1>
                    <input name="name" defaultValue={item.name}/> 
                    <br></br>
                    <h2>Description:</h2>
                    <input name="description" defaultValue={item.description}/> 
                    <button type="submit">Submit Changes</button>
                </form>
            );
        
        }
        else {
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
                <button type="submit" className="delete-button">DELETE</button>
                </form>            
                <button className="edit-button" onClick={handleEditClick}>EDIT</button>
                </div>
            );
        }
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
