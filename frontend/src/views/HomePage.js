import React, { Component } from 'react';
import { Container, Form} from 'reactstrap';
import '../styles/index.css';
import axios from 'axios';
import ItemTile from '../components/ItemTile';
 


class HomePage extends Component {

  state = {
    items: [],
    filterUser: null,
  }

  componentDidMount() {
    if (!this.state.filterUser){
      axios.get('http://localhost:8000/api/items/')
      .then(res => {
          this.setState({
              items: res.data
          });
      })
      .catch(err => {})
    }
  }

  handleFilterUser = e => {
    e.preventDefault();
    axios.get('http://localhost:8000/api/items/', {
      params: {
        filterUser: e.target.username.value
      }
    })
    .then(res => {
        this.setState({
            items: res.data,
            filterUser: e.target.username.value
        });
    })
    .catch(err => {})
  }

  render() {
    return (
      <div>
        <Container className="home-page-container">
          <Container className="text-center">
            <h1 className="display-4">Inventory Management</h1>
            <form onSubmit={this.handleFilterUser}>
            <hr />

              <h1>Filter by User: </h1>
              <input type="text" id="username" placeholder="Enter Username" />
              <button type="submit">Filter</button>
            </form>            
            <hr className="my-2" />
            <div className="items-container">
              {this.state.items.map(item => (
                <ItemTile item={item}/>
              ))}
            </div>
          </Container>
        </Container>
      </div>
    );
  }
}

export default HomePage;

