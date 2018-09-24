import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import SearchBar from './components/SearchBar.js'
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from 'react-google-maps';
import Map from './components/Map.js'
import Markers from './components/Markers.js'
import infoWindow from './components/InfoWindow.js'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-regexp'
import axios from 'axios'

class App extends Component {
  

   state = {
    venues: []
   /* defaultZoom: 13,
    defaultMarkerIcon: {},
    markerIcon: {},
    isOpen: false,
    defaultCenter: { lat: 40.416947, lng: -3.703529 },
    markers: [],
    query: '',
    infoContent: "",
    map: [],
    marker: []*/
    //mapTypeId: window.google.maps.MapTypeId.ROADMAP
  }

componentDidMount() {
  this.getVenues()
  
}

/*addMarker = (data) => {
     new window.google.maps.Marker({
        position: new window.google.maps.LatLng(data.lat, data.lng),
        map: this.map
    });
}*/
  

  renderMap = () => {
  // loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDzBxakJgyoP72UvsoJ6F-lpWCSGKl20IQ&v=3&callback=initMap")
    window.initMap = this.initMap
}

  initMap = () => {
    var latlng = {lat: 40.416947, lng: -3.703529};
    var  map = new window.google.maps.Map(document.getElementById('map'), {
         center: latlng,
         zoom: 13
    });

  /* //create a marker
    var marker = new window.google.maps.Marker({
              position: {lat: this.myVenue.venue.location.lat, lng: this.myVenue.venue.location.lng},
              //position: {lat:40.416447, lng: -3.702529 },
              map: map,
              draggable: true,
              animation: window.google.maps.Animation.DROP,
              title: this.myVenue.venue.name,
              icon: image
    });*/

     var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    // markers.push(addMarker(marker));   

    let contentString;
    //we display the markers
     this.state.venues.map (myVenue => {
          var marker = new window.google.maps.Marker({
              position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
              //position: {lat:40.416447, lng: -3.702529 },
              map: map,
              title: myVenue.venue.name
             /* draggable: true,
              animation: window.google.maps.Animation.DROP,
              ,
              icon: image*/
    });

      //       contentString = `${myVenue.venue.name}`
    })


   /*  var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=latlng&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=latlng</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';*/

            //create an infoWindow
        var infowindow = new window.google.maps.InfoWindow({
         // content: contentString,
          maxWidth: 200
        });

      //when we click on our marker this function 'open' will be executed. This is from https://developers.google.com/maps/documentation/javascript/infowindows
/*         marker.addListener('click', function() {

                //we set the new content, we change it
               infowindow.setContent(contentString)

                //open infowindow
                infowindow.open(map, marker);
              
                //animation from https://developers.google.com/maps/documentation/javascript/examples/marker-animations
                if(marker.getAnimation() !== null) {
                  marker.setAnimation(null) ;
                } else {
                  marker.setAnimation(window.google.maps.Animation.BOUNCE);
                }
        })*/

}



//update state function
  updateQuery = (query)=>{
  this.setState({query: query})
}

//a reset function
  clearQuery = ()=>{
  this.setState({query: '' })
}


 /*Foursquare API and getVenues from axios*/
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "SEVDSWXLYP1YMSO1TCUSW0MKDVMC2E4YWUMQDOURYLQNI2MJ",  /*foursquare keys*/
      client_secret: "LTLB2BI24EWW2ITXWMGJISPWLD1H2AUUUALL0ONY5VCVXJO0",

      /* parameters from https://developer.foursquare.com/docs/api/venues/explore*/
      section: "food",
      query: 'food',
      near: "Madrid",

      v:"20180323"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      // console.log(response.data.response.groups[0].items)
        this.setState({
          /*we store in the venues state the data*/
          venues: response.data.response.groups[0].items  

        }, this.renderMap()
        )
    
    }).catch(error => {
      alert("An ERROR has occurred! - " + error)
    })
   
  }



 onMarkerClick= this.handleMarkerClickEvent


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
                      onHandleLocationSelected = {this.handleLocationSelected}
                      onItemClick = {this.handleLocationItemClick}
                      updateQuery={this.updateQuery}
                />
             
        </div>
         {( navigator.onLine) && 
         ( <Map id="map" role="application" aria-labelledby="rg-label"
              
             > 
              
              <Markers  onClick = {this.onMarkerClick}
                        



               />
              <infowindow />
            

          
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
