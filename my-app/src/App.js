import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import SearchBar from './components/SearchBar.js'
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from 'react-google-maps';
import Map from './components/Map.js'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import escaperegexp from 'escape-regexp'

class App extends Component {


  initMap = () => {
  var  map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.416947, lng: -3.703529 },
    zoom: 13
    });
}








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
         {( navigator.onLine) && 
         ( <Map id="map" role="application" aria-labelledby="rg-label"
              

          />)}
          {(!navigator.onLine) && (<div>
            <h2>Map is offline</h2>
            </div>)}
      </main>
    );
  }
}

export default App;
