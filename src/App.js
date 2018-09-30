import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './App.css';
import Collections from './Collections';
import ItemsEntry from './ItemsEntry';

class App extends Component {

  render() {
    return (
      <Container>
        <ItemsEntry/>
        <Collections/>
      </Container>
    );
  }
}

export default App;
