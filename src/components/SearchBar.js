import React, { Component } from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'


class SearchBar extends React.Component {
	state = {
		query: ''
	}

	handleChange = (event) => {
		const query = event.target.value;
		this.setState({
		query: query
		});
		this.props.updateQuery(query)
	}
//inspiring from https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#
	render() {
		return (	 
			<div className='search-filter' tabIndex='0'>
		            <input id="mapsearch" 
		                type='text'
		                placeholder='Search'
		                onChange={this.handleChange}
		                value={this.state.query}
		                aria-label = "Search location"
		                role="search"
		            />
          	</div>
		)
	}
}

export default SearchBar