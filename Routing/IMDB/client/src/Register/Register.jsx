import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: ''
		}

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);
	}

	onChangeHandler(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmitHandler(e) {
		e.preventDefault();
		const { username, password, email } = this.state;
		this.props.registerHandler({ username, password, email });
	}

	render() {
		const { username, password, email } = this.state;

		return (
			<div className="Register">
				<h1>Register</h1>
				<form onSubmit={this.onSubmitHandler}>
					<label htmlFor="username">Username</label>
					<input type="text" name="username" onChange={this.onChangeHandler} value={username} id="username" placeholder="Ivan Ivanov" />
					<label htmlFor="email">Email</label>
					<input type="text" name="email" onChange={this.onChangeHandler} value={email} id="email" placeholder="ivan@gmail.com" />
					<label htmlFor="password">Password</label>
					<input type="password" name="password" onChange={this.onChangeHandler} value={password} id="password" placeholder="******" />
					<input type="submit" value="REGISTER" />
				</form>
			</div>
		);
	}
}

export default Register;
