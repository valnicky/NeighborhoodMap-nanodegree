import React, { Component } from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'


class SearchBar extends React.Component {
	state = {
		query: '',
		locationsSearchResult: []
	}

	updateQuery = (query) => {
		this.setState({
		query: query
		})
	}
//inspiring from https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#
	render() {
		return (	 
			<div className='search-filter' tabIndex='0'>
		            <input id="filter" 
		                type='text'
		                placeholder='Search'
		                onChange={(event) => this.props.updateQuery(event.target.value)}
		                value={this.state.query}
		                aria-label = "Search location"
		                role="search"
		            />
          	</div>
		)
	}
}

export default SearchBar