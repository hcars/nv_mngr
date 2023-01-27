import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";



function AddItem (props) {

  const { user } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/items/', {
      name: e.target.name.value,
      description: e.target.description.value,
      quantity: e.target.quantity.value,
      createdBy: user.user_id,
    })
    .then(res => {
      alert("Item Added!");
      history.push("/user_items");
    })
    .catch(error => {
      console.log(error);
      alert("Error adding item!");
  });
}

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Add Item</h1>
        <hr />
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="description"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            placeholder="1"
            required
          />
        </div>
        <div className="form-control">
          <button type="submit">Add</button>
        </div>
      </form>
    </section>
  );
  
};

export default AddItem;
