import React, { Component } from 'react';
import { Container, Form} from 'reactstrap';
import '../styles/index.css';
import axios from 'axios';
import ItemTile from '../components/ItemTile';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useEffect } from 'react';
import { useRef } from 'react';

function UserItems(props) {

  const {user} = useContext(AuthContext);
  const [items, setItems] = React.useState([]);
  const isMounted = useRef(false);

  useEffect (() => {
    if (!isMounted.current){
      axios.get('http://localhost:8000/api/items/', {
        params: {
          filterUser: user.username
        }
      })
      .then(res => {
          setItems(res.data)
          isMounted.current = true
          })
      .catch(err => {})
    }

  });



    return (
      <div>
        <Container className="home-page-container">
          <Container className="text-center">
            <h1 className="display-4">Inventory Management</h1>         
            <div className="items-container">
              {items.map(item => (
                <ItemTile item={item}/>
              ))}
            </div>
          </Container>
        </Container>
      </div>
    );
  
}

export default UserItems;

