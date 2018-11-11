#README for Project 8 - Neighbourhood Map

This is the 8th project required for the completion of Google-Udacity Front End Web Development Nanodegree.

I've used react-google-maps and Foursquare API

##How to Install

   - git clone https://github.com/valnicky/NeighborhoodMap-nanodegree.git
   - cd NeighborhoodMap-react-Project8Nanodegree
   - npm install
   - npm run start

    A Live Preview will open via http://localhost:3000/ by your default browser
    The page will reload if you make edits.
	You will also see any lint errors in the console.

##Installing a Dependency
	The project includes React and ReactDOM as dependencies. It also includes a set of scripts used by Create React App as a development dependency. You may install other dependencies (for example, React Router) with npm:

npm install --save react-router

npm init react-app 
npm install --save prop-types
npm install --save escape-string-regexp sort-by
npm install --save react-router-dom
npm install --save form-serialize
npm install axios

Alternatively you may use yarn:

yarn add react-router
This works for any library, not just react-router.

##Importing a Component

This project setup supports ES6 modules thanks to Babel. We encourage you to Use import and export instead of require() and module.exports.

SearchBar.js
	import React, { Component } from 'react';

	class SearchBar extends Component {
  			render() {
    				// ...
  			}
	}

export default SearchBar; 

