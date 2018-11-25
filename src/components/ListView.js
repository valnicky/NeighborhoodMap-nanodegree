import React, { Component } from 'react';

class ListView extends React.Component {
     /* state = {
            section: ''
      }*/


	listViewClick  = (e) => {
		const selectedMarker = this.props.markers.find(m => m.id == e.target.id);
		selectedMarker.onClick();	
	}


	render() {
		let listView = this.props.listView;
           
		return (

		    <ul>
            {this.props.matchingVenues.length && this.props.matchingVenues.map(v => 
            	<li id={v.venue.id} key={v.venue.id} onClick={this.listViewClick}>{v.venue.name}</li>)}
        	</ul>
			)
	}
}

export default ListView;