import React, { Component } from 'react';
import withWarning from '../hocs/withWarning';
import BoundFrom from './BoundForm';

class RegisterFormBase extends Component {
    onSubmitHandler(e, state) {
        e.preventDefault();
        console.log(state);
    }
    
    render() {
        return (
            <div>
                <header><span className="title">Register</span></header>
                <BoundFrom onSubmit={this.onSubmitHandler}>
                    Username:
                    <input type="text" name="username" /><br />
                    Email:
                    <input type="text" name="email" /><br />
                    Password:
                    <input type="password" name="password" /><br />
                    Repeat Password:
                    <input type="password" name="repeatPass" /><br />
                </BoundFrom>
            </div>
        )
    }
}

const RegisterForm = withWarning(RegisterFormBase);
export default RegisterForm;
