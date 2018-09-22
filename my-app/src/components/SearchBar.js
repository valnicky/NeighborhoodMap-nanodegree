import React, { Component } from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'


class SearchBar extends React.Component {
	static propTypes = {

	}

	state = {
		query: '',
		locationsSearchResult: []
	}

	updateQuery = (query) => {
		this.setState({
		query: query
		})
	}

	render() {

		return (
			 
			<div className='search-filter' tabIndex='0'>
		            <input
		                type='text'
		                placeholder='Search'
		                aria-label = "Search location"
		            />
          	</div>
		)
	}
}

export default SearchBar