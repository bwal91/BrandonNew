import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import App from './App';
import './index.css';
const 	ParseData = (moviethis) => {
			var that = moviethis.Title;
			console.log(that)
		}
class Search extends Component {
	state = {
		searchTerm: '',
		movieTitle: '',
		year: '',
		director: '',
		plot: '',
	}

	handleChange = (event) => {
		var term = event.target.value;
		this.setState({
			searchTerm: term
		})
	}

	handleSubmit(event) {
		var term = event.target.value
		console.log(term)
		var url = 'http://www.omdbapi.com/?t=' + term;
		console.log(url);
		fetch(url)
			.then(function(response){
				if (response.status >= 400){
					console.log("Bad");
					throw new Error("Bad response from Server");
				}
				console.log("Good");
				// return response.json();
				ParseData(response.json());
			})
			// .then(function(data) {
			// 	var that = this.state.movieTitle;
			// 	var me = data.Year
			// 	console.log(me);
			// 	console.log(that);
			// 	// console.log(data);
			// 	// const me = data.Title;
			// 	// JSON.stringify(me);
			// 	// console.log(me);
			// 	// var title = data.Tile;
			// 	// var year = data.Year;
			// 	this.setState({movieTitle: me});
			// 	// this.setState({year: year});
			// 	// this.setState({director: data.Director});
			// 	// this.setState({plot: data.Plot});
			// })
		event.preventDefault();
	}

	render(){
		return (
			<div id="search">
				<form>
					<input type="text" onChange={this.handleChange} value={this.state.search} placeholder="Movie Title" />
					
					<button type="button" value={this.state.searchTerm} onClick={this.handleSubmit}>Search</button>
				</form>
					<h3>{this.state.searchTerm}</h3>
					<h3>{this.state.movieTitle}</h3>
					<h3>{this.state.year}</h3>
					<h3>{this.state.director}</h3>
					<h3>{this.state.plot}</h3>
			</div>
			)
	}
	
}

const App = (props) => {

	return (
		<div className="App">
			<h1>Movie Data</h1>
			<Search />
		</div>

		)
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
