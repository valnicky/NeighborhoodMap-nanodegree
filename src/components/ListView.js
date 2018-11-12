import React, { Component } from 'react';

class ListView extends React.Component {
     /* state = {
            section: ''
      }*/

	render() {
		var listView = this.props.listView;
           // console.log('xxxxxx', this.props.matchingVenues)
           
		return (

		    <ul>
            {this.props.matchingVenues.length && this.props.matchingVenues.map(v => <li>{v.venue.name}</li>)}
        </ul>
			)
	}
}

export default ListView;