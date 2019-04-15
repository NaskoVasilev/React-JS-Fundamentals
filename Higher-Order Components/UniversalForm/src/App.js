import React, { Component } from 'react';
import './warning.css';

import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
	render() {
		return (
			<ErrorBoundary>
				<Header/>
				<RegisterForm />
				<Navigation />
			</ErrorBoundary>
		);
	}
}

export default App;
