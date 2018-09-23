import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from 'react-google-maps'
import PropTypes from 'prop-types'
import escaperegexp from 'escape-regexp'

class Map extends React.Component {

	render(){

      const Map = withGoogleMap(props => (
        <GoogleMap
          defaultCenter = { { lat: 40.416947, lng: -3.703529 } }
          defaultZoom = { 13 }
        >
        </GoogleMap>
        ));
		
		 return(
        <div ref="map">
          
      
        <Map
          containerElement={ <div style={{ height: `100vh`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%`, width: `100%` }} /> }
   

        >

        </Map>
        </div>
        );
    }


}

export default Map
