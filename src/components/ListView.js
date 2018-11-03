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
		return (

		<ul>
                  <li id="coffee" onChange={this.searchSection}>Coffee</li>
                  <li id="food">Food</li>
                  <li id="drinks">Drinks</li>
                  <li id="shops">Shops</li>
                  <li id="arts">Arts</li>
                  <li>Outdoors</li>
                  <li>Nightlife</li>
                  <li>Sights</li>
                  <li>Trending</li>
            </ul>
			)
	}
}

export default ListView;