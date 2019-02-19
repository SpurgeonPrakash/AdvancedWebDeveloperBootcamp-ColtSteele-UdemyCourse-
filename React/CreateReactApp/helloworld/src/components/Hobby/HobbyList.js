import React, { Component } from 'react';

class HobbyList extends Component {
  render(){
    const hobbies = ['Sleeping', 'Eating', 'Jumping', 'Meowing'];
    const style = {fontSize: '1.5em'};
    return (
    <ul>
      {hobbies.map((hobby, i) => { return <li key={i} style={style}>{hobby}</li>})}
    </ul>
  );
  }
}

export default HobbyList;
