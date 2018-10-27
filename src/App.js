import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import ListView from './components/ListView.js'
import SearchBar from './components/SearchBar.js'
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from 'react-google-maps';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-regexp'
import axios from 'axios'

const loadMap = (src, callback) => {
  const ref= window.document.getElementsByTagName("script")[0];
  console.log('´rrrrrrrrrr', src, ref)
  const script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true
  script.onerror = () => {
    document.write('unable to load Google Maps');
  }
  ref.parentNode.insertBefore(script, ref);
  callback()
}

class App extends Component {

   state = {
      venues: [],
      markers: [],
      query: ''
  }

componentDidMount() {
  console.log('got hereeeeee')
  this.getVenues()  
}

 renderMap = () => {
    console.log('inside render map', this.state.venues)

   //loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDzBxakJgyoP72UvsoJ6F-lpWCSGKl20IQ&v=3&callback=initMap")
     window.initMap = this.initMap.bind(this);  
    loadMap('https://maps.googleapis.com/maps/api/js?key=AIzaSyDzBxakJgyoP72UvsoJ6F-lpWCSGKl20IQ&v=3&callback=initMap', () => {
      this.setState({mapLoaded: true})
    });
    
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
       console.log('ressssssss', response.data.response.groups[0].items)
        this.setState({
          //we store in the venues state the data
          venues: response.data.response.groups[0].items  
        }, this.renderMap
        )
    
    }).catch(error => {
      alert("An ERROR has occurred! - " + error)
    })
   
  }


  initMap() {
    // setTimeout(() =>  this.setState({mapLoaded: true}) ,  5000);
    //setTimeout(() => {
     
   console.log('ínside init map', document.getElementById('map'))
    let latlng = {lat: 40.416947, lng: -3.703529};

    const  map = new window.google.maps.Map(document.getElementById('map'), {
         center: latlng,
         zoom: 13
    });

   // }, 5000)


this.infoWindow = new window.google.maps.InfoWindow({
      maxWidth: 180
    });


this.state.venues.map(v => {

      const contentString = `<b>${v.venue.name}</b> <br><i>${v.venue.location.address}</i></br>
      <br><i>Data Provided by Foursquare.</i>`;

      const marker = new window.google.maps.Marker({
        position: {lat: v.venue.location.lat, lng: v.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: v.venue.name
      });

      const openMarker = () => {
        this.infoWindow.setContent(contentString);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 550)
        this.infoWindow.open(map, marker);        
      }

      marker.addListener('click', () => {
        openMarker();
      });

      this.state.markers.push(marker);

    //  let searchBox = new window.google.maps.places.SearchBox(document.getElementById('mapsearch'));

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



  render() {
     let showingLocations;
           if (this.state.query) {
                  const match = new RegExp(escapeRegExp(this.state.query, 'i'))
                  showingLocations = this.state.venues.filter((venue) => match.test(venue.venue.name))
            } else {
                 showingLocations = this.state.venues
            }


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
                 
                      updateQuery={this.updateQuery}
                />
                <ListView/>
             
        </div>
         {( navigator.onLine) && this.state.mapLoaded && 
         (
              
          <div id="map" role="application" aria-labelledby="rg-label"/>

          )}
          {(!navigator.onLine) && (<div>
            <h2>Map is offline</h2>
            </div>)}
      </main>
    );
  }


}

export default App;