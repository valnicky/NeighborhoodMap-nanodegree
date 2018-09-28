import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from 'react-google-maps'
import Markers from './Markers.js'

import PropTypes from 'prop-types'
import escaperegexp from 'escape-regexp'

class Map extends React.Component {

	render(){

      const Map = withGoogleMap(props => (
        <GoogleMap
          defaultCenter = { { lat: 40.416947, lng: -3.703529 } }
          defaultZoom = { 13 }
        >

        
           <Marker
          	//position={{lat: props.marker.position.lat, lng: props.marker.position.lng}}
             position = {{lat:40.416447, lng: -3.702529}}
       		   animation={window.google.maps.Animation.DROP}
           />

        </GoogleMap>
        ));
		
		 return(
        <div ref="map">
          
      
        <Map
          containerElement={ <div style={{ height: `100vh`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%`, width: `100%` }} /> }
   

        >
          <Markers/>
          <infowindow/>
        </Map>
       
        </div>
        );
    }


}

export default Map
