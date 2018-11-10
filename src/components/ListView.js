import React, { Component } from 'react';

class ListView extends React.Component {
      state = {
            section: ''
      }

      searchSection = (sec) => {
            let secChoosed;
            let food = document.getElementById(sec);
            if (food == 'food') {

                  this.setState({section: 'food'});
             }
          
      }

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