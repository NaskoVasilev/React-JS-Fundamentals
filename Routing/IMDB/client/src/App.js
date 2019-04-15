import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Home from './Home/Home.jsx';
import Register from './Register/Register.jsx';
import Login from './Login/Login.jsx';
import Create from './Create/Create.jsx';
import Header from  './common/Header';
import './App.css';
import { register, login } from './api/remote';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.registerHandler = this.registerHandler.bind(this)
		this.loginHandler = this.loginHandler.bind(this)
		this.logoutHandler = this.logoutHandler.bind(this)
	}

	registerHandler(data) {
		register(data)
			.then(json => {
				if (json.errors) {
					for (let key in json.errors) {
						toast.error(json.errors[key].msg);
					}
					return;
				}

				this.loginHandler(data, 'Register');
			})
	}

	loginHandler(data, type) {
		login(data)
			.then(json => {
				if (!json.token) {
					toast.error(json.message);
					return;
				}

				sessionStorage.setItem('authToken', json.token);
				sessionStorage.setItem('isAdmin', json.isAdmin);
				sessionStorage.setItem('username', json.username);
				toast.success(`${type || 'Login'} successful.`);
				this.props.history.push('/');
			})
	}

	logoutHandler() {
		sessionStorage.clear();
		toast.success('Logout successful.');
		this.props.history.push('/');
	}

	render() {
		return (
			<div id="root">
				<ToastContainer closeButton={false} />
				<div className="App">
					<Header loggedIn={sessionStorage.getItem('authToken')} logoutHandler={this.logoutHandler}/>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login" render={() => <Login loginHandler={this.loginHandler}/>} />
						<Route path="/register" render={() => <Register registerHandler={this.registerHandler}/>} />
						<Route path="/movie/create" component={Create} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default withRouter(App);
