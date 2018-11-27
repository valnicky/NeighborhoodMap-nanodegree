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
    alert('unable to load Google Maps');
  }
  ref.parentNode.insertBefore(script, ref);
  callback()
}

class App extends Component {

  constructor(props) {
    super(props);
  }

  state = {
      venues: [],
      markers: [],
      query: '',
      matchingVenues: []
  }

componentDidMount() {
  //console.log('got hereeeeee')
  this.getVenues()  
}

 renderMap = () => {
    //console.log('inside render map', this.state.venues)

   //loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDzBxakJgyoP72UvsoJ6F-lpWCSGKl20IQ&v=3&callback=initMap")
     window.initMap = this.initMap.bind(this);  
    loadMap('https://maps.googleapis.com/maps/api/js?key=AIzaSyDzBxakJgyoP72UvsoJ6F-lpWCSGKl20IQ&v=3&callback=initMap', () => {
      this.setState({mapLoaded: true})
    });
    
}

/*Foursquare API and getVenues from axios, inspired by https://www.youtube.com/watch?v=MEzcDiA6shM*/
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "SEVDSWXLYP1YMSO1TCUSW0MKDVMC2E4YWUMQDOURYLQNI2MJ",  //foursquare keys
      client_secret: "LTLB2BI24EWW2ITXWMGJISPWLD1H2AUUUALL0ONY5VCVXJO0",
      // parameters from https://developer.foursquare.com/docs/api/venues/explore :
      section: "",
      query: '',
      near: "Madrid",
     // description: '',
      v:"20180323",
      categories: [],
     // url: '',
     // venuePhotos: 1,
      id: ''
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        //console.log('ressssssss', response.data.response.groups[0].items)
        this.setState({
          //we store in the venues state the data we have
          venues: response.data.response.groups[0].items  
        }, this.renderMap
        )
    
      }).catch(error => {
         alert("An ERROR has occurred! - " + error)
    })
   
  }

  initMap() {
     
    //console.log('ínside init map', document.getElementById('map'))
    let latlng = {lat: 40.416947, lng: -3.703529};

    const  map = new window.google.maps.Map(document.getElementById('map'), {
         center: latlng,
         zoom: 13
    });


    this.infoWindow = new window.google.maps.InfoWindow({
      maxWidth: 220
    });


    this.state.venues.map(async(v) => {
    //const venue = await axios.get(`https://api.foursquare.com/v2/venues/${v.venue.id}`)
    //    .then(response => {
       //console.log('each vvvvvvvv', venue)

      const contentString = `<b>${v.venue.name}</b> <br><i>${v.venue.location.address}</i>
      <br/>${v.venue.location.postalCode}, ${v.venue.location.city}</br>${v.venue.categories[0].name}<br/>
      <br/><i>Data Provided by Foursquare.</i>`;  
      

      const marker = new window.google.maps.Marker({
        position: {lat: v.venue.location.lat, lng: v.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: v.venue.name,
        location: v.venue.location,
        id: v.venue.id,
        //description: v.venue.description,
       //url: v.venue.url,
        categories: v.venue.categories.name
      });

      const openMarker = () => {
        this.infoWindow.setContent(contentString);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 550)
        this.infoWindow.open(map, marker);  
        this.infoWindow.addListener('closerClick', function() {
          this.infoWindow = null
        })    
      }

      marker.onClick = () => {
        openMarker();
      }

      marker.addListener('click', () => {
        openMarker();
      });

      this.state.markers.push(marker);

         
 //   }).catch(error => {
   //   alert("An ERROR has occurred! - " + error)
    //})

    })

}


onMarkerClick = (props, venue, e) =>
  this.setState({
    selectedVenue: props,
    activeMarker: venue,
    showingInfoWindow: true
});

onMapClicked = props => {
  if(this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }
}


  //delete all the markers on the map
    clearQuery = () => {
      this.setState({query: '' });
      this.setState({queryResult: this.state.venues});
}


//update the state 
    updateQuery = (query) => {
      this.setState({query: query})
}

//compare the list item to markers
onListItemClick = (e) => {
  const markers = this.state.markers.find(
  marker => marker.props.name === e.target.innerText
    );

    if(markers !== undefined) {
    markers.marker.onClick(markers.props, markers.marker, e)
}
}


  render() {
    //console.log('´svvvvvvvvvvv', this.state.venues)
 
    //t matcher = query => {
    const{map, markers, query} = this.state;
   //this.setState({query});
    let matchingVenues = [];
    if (query) {
     // console.log('queyyryyyyyy', query)
      const match = new RegExp(escapeRegExp(this.state.query.toLowerCase(), "i"));
      matchingVenues = this.state.venues.filter(v => match.test(v.venue.name.toLowerCase()));
      //console.log("match: "+ match)
      //console.log("matchingVenues  : ", matchingVenues);
      const nonMatchingMarkers = this.state.markers.filter(marker => matchingVenues.every(v => v.venue.name !== marker.title ));
      //console.log("nonMatchingMarkers  : ", nonMatchingMarkers);
      //console.log("markerrrrrrrs  : ", this.state.markers);
      //markers.filter(marker => match.test(marker.title)? (marker.setVisible(true)) : (marker.setVisible(false)));            
      //this.setState({markers});
      this.state.markers.forEach(marker => marker.setVisible(true))
      nonMatchingMarkers.forEach(marker => marker.setVisible(false))
      //console.log('qqqqqqqqqq', query, '´mmmmmmmmmmm', match, '´maaaaaaaaaaaa', nonMatchingMarkers)
      //this.setState({venues: matchingVenues})
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
                      updateQuery={this.updateQuery}
                      //showingLocations= {this.showingLocations}
                     //atcher={this.matcher}
          />
                <ListView matchingVenues={matchingVenues.length && matchingVenues} markers={this.state.markers} />
             
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