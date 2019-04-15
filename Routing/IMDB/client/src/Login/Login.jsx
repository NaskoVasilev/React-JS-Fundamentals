import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
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
		const { username, password } = this.state;
		this.props.loginHandler({ username, password });
	}

	render() {
		const { username, password } = this.state;
		return (
			<div className="Login">
				<h1>Login</h1>
				<form onSubmit={this.onSubmitHandler}>
					<label htmlFor="usernameLogin">Username</label>
					<input type="text" name="username" onChange={this.onChangeHandler} value={username} id="usernameLogin" placeholder="Ivan Ivanov" />
					<label htmlFor="passwordLogin">Password</label>
					<input type="password" name="password" onChange={this.onChangeHandler} value={password} id="passwordLogin" placeholder="******" />
					<input type="submit" value="Login" />
				</form>
			</div>
		);
	}
}

export default Login;
