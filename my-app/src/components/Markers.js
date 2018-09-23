import React, { Component } from 'react';
import { Marker } from "react-google-maps";
import infowindow from './InfoWindow.js'

class Markers extends React.Component {
	
  
componentWillUnmount() {
  if(this.marker) {
    this.marker.setMap(null);
  }
}

renderMarker() {
  const evtNames = ['click', 'mouseover'];

    let {
      map, google, position, mapCenter
    } = this.props;

    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);

    const pref = {
        map: map,
        position: position
      };
      this.marker = new google.maps.Marker(pref);
      evtNames.forEach(e => {
        this.marker.addListener(e, this.handleEvent(e));
      })
  }
	 
	render() {
     const Marker = new window.google.maps.Marker(
        this.position :{lat: props.marker.position.lat, lng: props.marker.position.lng},
        
        this.title: props.myVenue.venue.name
)
    return (

       <infowindow/>

      )
	}

  handleEvent(evtName) {
    return (e) => {
     // const evtName = `on${camelize(evt)}`
      if(this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e);
      }
    }
  }

}

export default Markers;