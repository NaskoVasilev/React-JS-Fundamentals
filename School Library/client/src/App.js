import React, {Component, Fragment} from 'react';
import Header from "./components/header";
import {Switch, Route, withRouter} from 'react-router-dom'
import HomePage from "./views/homePage";
import Register from "./views/register";
import Login from "./views/login";
import NotFound from "./views/notFound";
import {ToastContainer, toast} from 'react-toastify';

import {register, login, logout} from './api/requester';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {};
        this.registerHandler = this.registerHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    registerHandler(data) {
        register(data)
            .then(json => {
                if (json.errors) {
                    for (let key in json.errors) {
                        toast.error(json.errors[key]);
                    }
                    return;
                }
                toast.success(json.message)
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
            .catch(err => {
                console.log(err.message)
            })
    }

    logoutHandler() {
        logout()
        sessionStorage.clear();
        toast.success('Logout successful.');
        this.props.history.push('/');
    }

    render() {
        return (
            <Fragment>
                <ToastContainer closeButton={false}/>
                <Header logoutHandler={this.logoutHandler}/>
                <main>
                    <Switch>
                        <Route exact path='/' component={HomePage}/>
                        <Route exact
                               path='/users/login'
                               render={() => <Login loginHandler={this.loginHandler}/>}
                        />
                        <Route exact
                               path='/users/register'
                               render={() => <Register registerHandler={this.registerHandler}/>}
                        />
                        <Route component={NotFound}/>
                    </Switch>
                </main>
            </Fragment>
        );
    }
}

export default withRouter(App);
