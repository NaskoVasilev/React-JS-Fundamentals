import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import AppHeader from "./App/AppHeader";
import AppContent from "./App/AppContent";
import AppFooter from "./App/AppFooter";
import { register, login, getGames, createGamePost } from './api/remote';


class App extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: null,
            games: [],
            hasFetched: false,
            loginForm: false,
        }
    }

    registerUser(user) {
        register(user)
        .then(res=> res.json())
        .then(json => {
            if (json.userId) {
                this.loginUser(user, 'Register');
            } else {
                for (let error of json.errors) {
                    toast.error(error.msg);
                }
            }
        })
    }

    loginUser(user, type) {
        login(user)
        .then(res => res.json())
        .then(json => {
            if(json.token){
                sessionStorage.setItem('authToken', json.token);
                sessionStorage.setItem('username', json.username);
                this.setState({user: json.username});
                toast.success(`${type ? type : 'Login'} successful.`);
            }else {
                toast.error(json.message);
            }
        })
    }

    logout(event) {
        event.preventDefault();
        sessionStorage.clear();
        this.setState({ user: null});
        toast.success('Logout successful.');
    }

    componentWillMount() {
        if (sessionStorage.getItem('authToken')) {
            this.setState({'user': sessionStorage.getItem('username')});
        }
       
        getGames()
        .then(res => res.json())
        .then(json => {
            this.setState({'games': json.games});
        })
    }

    createGame(data) {
        createGamePost(data)
        .then(res => res.json())
        .then(json => {
            this.state.games.push(json.game);
            this.setState({
                games: this.state.games
            })
            toast.success('Game created successful.');
        });

    }

    switchForm() {
        this.setState(prevState => {
            return {
                loginForm: !prevState.loginForm
            }
        });
    }

    render() {
        return (
            <main>
                <ToastContainer />
                <AppHeader
                    user={this.state.user}
                    logout={this.logout.bind(this)}
                    switchForm={this.switchForm.bind(this)}
                    loginForm={this.state.loginForm}
                />
                <AppContent
                    registerUser={this.registerUser.bind(this)}
                    loginUser={this.loginUser.bind(this)}
                    games={this.state.games}
                    createGame={this.createGame.bind(this)}
                    user={this.state.user}
                    loginForm={this.state.loginForm}
                />
                <AppFooter />
            </main>
        )
    }
}

export default App;


