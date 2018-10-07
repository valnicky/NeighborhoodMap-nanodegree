import React, { Component } from 'react';

class ListView extends React.Component {
	render() {
		var listView = this.props.listView;
		return (

		<ul>
                  <li>Coffee</li>
                  <li>Food</li>
                  <li>Drinks</li>
                  <li>Shops</li>
                  <li>Arts</li>
                  <li>Outdoors</li>
                  <li>Sights</li>
                  <li>Trending</li>
            </ul>
			)
	}
}

export default ListView;