import React, { Component } from 'react';
import { Container} from 'reactstrap';
import '../styles/index.css';
import axios from 'axios';
import ItemTile from '../components/ItemTile';
 


class HomePage extends Component {

  state = {
    items: [],
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/items/')
    .then(res => {
        this.setState({
            items: res.data
        });
    })
    .catch(err => {})
}

  render() {
    return (
      <div>
        <Container className="home-page-container">
          <Container className="text-center">
            <h1 className="display-4">Welcome to Inventory Management!</h1>
            <p className="lead">
              Please enjoy our wide selection of items.
            </p>
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

