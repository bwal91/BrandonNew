import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// import App from './App';

import './index.css';


class ValidatedInput extends Component {
	state = {
		value: '',
		valid: false
	}
	handleChange = (event)=>{
		const inputVal = event.target.value;
		this.setState({
			value: event.target.value,
			valid: this.props.validation(inputVal)
		});
	}
	render(){
		return (
			<div>
				<input type="text" 
				value={this.state.value}
				onChange={ this.handleChange }
				/>
				{
					(this.state.valid) ? null : <span className="error" > {this.props.message} </span>
				}
				
			</div>
		)
	}
}

ValidatedInput.PropTypes = {
	message: PropTypes.string.isRequired,
}
const validateName = (name) => (name.length >= 8);
const validateEmail = (email) => (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email));

class Form extends Component {
	state = {
		shouldBLockSubmission: true,
		nameHasError: true,
		emailHasError: true
	}
	updateVal = (newVal, key) => {
		this.setState({
			[key]: newVal
		})
	}
	render(){
		return (
			<form>
				<ValidatedInput message="Must be at least 8 characters!" 
				validation={validateName} 
				/>
				<ValidatedInput message="Must be a Valid Email"
				validation={validateEmail}
				/>
				<input type="submit" value="Submit" disabled={this.state.nameHasError} />
			</form>
		)
	}
}

const App = (props) => {
	return (
		<div className="App">
			<h1>Registration Form</h1>
			<Form />
		</div>
	)
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
