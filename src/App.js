import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import ListView from './components/ListView.js'
import SearchBar from './components/SearchBar.js'
import InfoWindow from './components/InfoWindow.js'
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from 'react-google-maps';
import Map from './components/Map.js'
import Markers from './components/Markers.js'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-regexp'
import axios from 'axios'

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
      marker: [],
      showingInfoWindow: false,

      //mapTypeId: window.google.maps.MapTypeId.ROADMAP
  }

componentDidMount() {
  this.getVenues()  
}

//create an array of markers
createMarker = (marker) => {
  if(marker !== null) {
     new window.google.maps.Marker({
        position: new window.google.maps.LatLng(marker.lat, marker.lng),
        map: this.map
    });
    this.state.markers.push(marker);
  }
}
  

  renderMap = () => {
   //loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDzBxakJgyoP72UvsoJ6F-lpWCSGKl20IQ&v=3&callback=initMap")
    window.initMap = this.initMap
}

/*Foursquare API and getVenues from axios*/
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "SEVDSWXLYP1YMSO1TCUSW0MKDVMC2E4YWUMQDOURYLQNI2MJ",  //foursquare keys
      client_secret: "LTLB2BI24EWW2ITXWMGJISPWLD1H2AUUUALL0ONY5VCVXJO0",
      // parameters from https://developer.foursquare.com/docs/api/venues/explore
     // section: "food",
      query: 'food',
      near: "Madrid",
      v:"20180323"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      // console.log(response.data.response.groups[0].items)
        this.setState({
          //we store in the venues state the data
          venues: response.data.response.groups[0].items  
        }, this.renderMap()
        )
    
    }).catch(error => {
      alert("An ERROR has occurred! - " + error)
    })
   
  }

  initMap = () => {
    var latlng = {lat: 40.416947, lng: -3.703529};
    var  map = new window.google.maps.Map(document.getElementById('map'), {
         center: latlng,
         zoom: 13
    });


     var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    
   
    
    //we display the markers
     this.state.venues.map (myVenue => {
          var marker = new window.google.maps.Marker({
              position: {lat: this.myVenue.venue.location.lat, lng: this.myVenue.venue.location.lng},
              //position: {lat:40.416447, lng: -3.702529 },
              map: map,
              title: myVenue.venue.name,
             // draggable: true,
              animation: window.google.maps.Animation.DROP,
              
              icon: image
    });

           var  contentString = `${myVenue.venue.name}`
    })

     if(this.marker !== null) {
            this.markers.push(this.marker);}

    this.state.markers.push(this.addMarker(this.marker));   

            //create an infoWindow
        var infowindow = new window.google.maps.InfoWindow({
          content: this.contentString,
          maxWidth: 200
        });

      //when we click on our marker this function 'open' will be executed. This is from https://developers.google.com/maps/documentation/javascript/infowindows
        this.marker.addListener('click', function() {

                //we set the new content, we change it
               infowindow.setContent(this.contentString)
              this.setState({
                showingInfoWindow: true
              })
               
                //open infowindow
                infowindow.open(map, this.state.marker);
              
                //animation from https://developers.google.com/maps/documentation/javascript/examples/marker-animations
                if(this.state.marker.getAnimation() !== null) {
                  this.state.marker.setAnimation(null) ;
                } else {
                  this.state.marker.setAnimation(window.google.maps.Animation.BOUNCE);
                }
        })

}

//compare list item to marker
onListItemClick = (e) => {
  const markers = this.state.markers.find(
    marker => marker.props.name === e.target.innerText
    );
  if(markers !== undefined) {
    markers.marker.onClick(markers.props, markers.marker, e)
}
}

onMapClicked = props => {
  if(this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }
}

onMarkerClick = (props, venue, e) =>
this.setState({
  selectedVenue: props,
  activeMarker: venue,
  showingInfoWindow: true
});

//update state function
  updateQuery = (query)=>{
  this.setState({query: query})
}

//a reset function
  clearQuery = () => {
  this.setState({query: '' });
  this.setState({ queryResult: this.state.venues});
}



//open infowindow if marker/list is clicked
/* onMarkerClick= (props, venue, e) => 
      this.setState(
          venue: props,
          activemarker: venue,
          showingInfoWindow: true
        );*/


  render() {
     let showingLocations;
           if (this.state.query) {
                  const match = new RegExp(escapeRegExp(this.state.query, 'i'))
                  showingLocations = this.state.venues.filter((venue) => match.test(venue.venue.name))
            } else {
                 showingLocations = this.state.venues
            }


      /*      let {locations, markers} = this.props
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
        
    return (
      <main className="App" role="main">
        <div className="App-header" id="app-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>MADRID</h1>
          <h2 className="App-title">My Neighborhood</h2>
          <SearchBar 
                      venues={this.state.venues}
                      query={this.state.query}
                      getVenues = {this.getVenues}
                      showingLocations={showingLocations}
                      locations= {this.state.locations}
                      onUserDidSearch = {this.updateLocations}
                     // onHandleLocationSelected = {this.handleLocationSelected}
                     // onItemClick = {this.handleLocationItemClick}
                      updateQuery={this.updateQuery}
                />
                <ListView/>
             
        </div>
         {( navigator.onLine) && 
         ( <Map id="map" role="application" aria-labelledby="rg-label"
              onMarkerClick= {this.onMarkerClick}
              showingInfoWindow = {this.state.showingInfoWindow}
              venues={this.state.venues}
              markers= {this.state.markers}
            
              activeMarker={this.state.activeMarker}
              createMarker={this.addMarker}
              query={this.state.query}
              updateQuery={this.updateQuery}
              clearQuery={this.clearQuery}
              onMapClicked={this.onMapClicked}
             > 
              
              <Markers  
                      position =  {this.position}
                      animation={this.animation}  
                      showingInfoWindow={this.state.showingInfoWindow}
                      tabIndex="0"  
                      infoContent={this.state.infoContent}
                      zoom= {this.state.zoom}
                      markerIcon= {this.state.markerIcon}
                      venues={this.state.venues}
                      locations= {this.locations}
                      showingLocations={this.showingLocations}
                      showInfoIndex = {this.state.showInfoIndex}
                      onMapClicked = {this.onMapClicked}

                      
            
               />
              <InfoWindow
                marker={this.state.marker}
                visible={this.state.showingInfoWindow}
                onClick={this.state.showingInfoWindow}>
                    <div>{this.state.infoContent}</div>
               </InfoWindow> 
          </Map>



          )}
          {(!navigator.onLine) && (<div>
            <h2>Map is offline</h2>
            </div>)}
      </main>
    );
  }


  /*tabIndex="0"  
              infoContent={this.state.infoContent}
              zoom= {this.state.zoom}
              markerIcon= {this.state.markerIcon}
              onMarkerClick = {this.handleMarkerClicked}
              locations= {this.state.position}
              showingLocations={showingLocations}
              showInfoIndex = {this.state.showInfoIndex}*/

 loadScript = (url)  => {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDzBxakJgyoP72UvsoJ6F-lpWCSGKl20IQ&v=3"
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
    script.onerror = function() {
    alert("ERROR! GoogleMap is not loading correctly!!!");
    }
    }



}

export default App;