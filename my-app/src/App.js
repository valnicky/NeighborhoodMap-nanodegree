import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar.js'

class App extends Component {
  render() {
    return (
      <main className="App" role="main">
        <div className="App-header" id="app-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>MADRID</h1>
          <h2 className="App-title">My Neighborhood</h2>
          <SearchBar 
          />
        </div>
      </main>
    );
  }
}

export default App;
