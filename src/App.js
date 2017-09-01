import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameCon from './containers/GameCon';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameCon />
      </div>
    );
  }
}

export default App;
