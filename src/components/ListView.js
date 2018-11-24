import React, { Component } from 'react';

class ListView extends React.Component {
     /* state = {
            section: ''
      }*/


	listViewClick  = (m) => {
		
			console.log("clickListView: " + m);	
			console.log();
		
	}


	render() {
		let listView = this.props.listView;
           // console.log('xxxxxx', this.props.matchingVenues)
           
		return (

		    <ul>
            {this.props.matchingVenues.length && this.props.matchingVenues.map(v => 
            	<li key={v.venue.id} onClick={this.listViewClick}>{v.venue.name}</li>)}
        	</ul>
			)
	}
}

export default ListView;