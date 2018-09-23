import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import SearchBar from './components/SearchBar.js'
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from 'react-google-maps';
import Map from './components/Map.js'
import Markers from './components/Markers.js'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import escaperegexp from 'escape-regexp'

class App extends Component {

   state = {
    venues: [],
    defaultZoom: 13,
    defaultMarkerIcon: {},
    markerIcon: {},
    isOpen: false,
    defaultCenter: { lat: 40.416947, lng: -3.703529 },
    markers: [],
    query: '',
    infoContent: "",
    map: [],
    marker: []
    //mapTypeId: window.google.maps.MapTypeId.ROADMAP
  }

  renderMap = () => {
  // loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDzBxakJgyoP72UvsoJ6F-lpWCSGKl20IQ&v=3&callback=initMap")
    window.initMap = this.initMap
}


  initMap = () => {
  var  map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.416947, lng: -3.703529 },
    zoom: 13
    });

   //create a marker
    var marker = new window.google.maps.Marker({
              position: {lat:40.416447, lng: -3.702529 },
              //{lat: this.myVenue.venue.location.lat, lng: this.myVenue.venue.location.lng},
              //position: {lat:40.416447, lng: -3.702529 },
              map: map,
              draggable: true,
              animation: window.google.maps.Animation.DROP,
              title: "my Marker.com",
              //this.myVenue.venue.name,
              icon: image
    });

     var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
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
