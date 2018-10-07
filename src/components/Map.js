import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow, withScriptjs } from 'react-google-maps'
import Markers from './Markers.js'

import PropTypes from 'prop-types'
import escaperegexp from 'escape-regexp'

class Map extends React.Component {

  render(){
/*let {locations, markers} = this.props
    let locationsHasValue = false
      if(locations !== undefined && locations !== null && locations.length > 0) locationsHasValue =true
    if(locationsHasValue) {
      let marker = {}
      locations.map((loc) => {
        marker = {  lat: loc.location.lat, 
              lng: loc.location.lng,
              title: loc.name,
              venueId: loc.id
            }
        markers.push(marker) 
      })

    }*/

      const Map = withGoogleMap(props => (
        <GoogleMap
          defaultCenter = { { lat: 40.416947, lng: -3.703529 } }
          defaultZoom = { 13 }
          markers = {this.markers}
        >

        
           <Marker
            // position={this.position }
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
              <Marker position= {this.position}
                   animation={window.google.maps.Animation.DROP} />
              <InfoWindow/>
            </Map>
           
        </div>
        );
    }


}

export default Map