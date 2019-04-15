import React from 'react';
import './register.css';

class RegisterForm extends React.Component {
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
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.props.registerUser({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        const {username, password, email} = this.state;

        return (
            <div className="Register">
                <h1>Sign Up</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <label>Username</label>
                    <input type="text" value={username} onChange={this.onChangeHandler} name="username" id="usernameReg"/>
                    <label>Email</label>
                    <input type="text" value={email} onChange={this.onChangeHandler} name="email" id="emailReg"/>
                    <label>Password</label>
                    <input type="password" value={password} onChange={this.onChangeHandler} name="password" id="passwordReg"/>
                    <input type="submit" value="Sign Up"/>
                </form>
            </div>
        )
    }
}
export default RegisterForm;