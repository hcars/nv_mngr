import React, { Component } from 'react';
import '../styles/ItemTile.css';


function truncate(text){
    if (text.length > 100){
        return text.substring(0, 100) + "...";
    }
    else{
        return text;
    }
}



class ItemTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    }
  }

  render() {
    return (
      <div className="item-tile">
        <div className="item-tile-name">{this.state.item.name}</div>
        <div className="item-tile-description">
            <b>Description: </b>
            <p>
            {truncate(this.state.item.description)}
            </p>
            </div>
        <div className="item-tile-quantity"><b>Quantity</b>: {this.state.item.quantity}</div>
      </div>
    );
  }
}

export default ItemTile;
