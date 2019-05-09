import React, {Component} from 'react';
import userIcon from '../images/userIcon.png'
import Form from '../components/form';

class Login extends Component {
    constructor(props){
        super(props)
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(e, data) {
        e.preventDefault();
        const { username, password } = data;
        this.props.loginHandler({ username, password });
    }

    render() {
        return (
            <div className="wrapper fadeInDown" id="register-form">
                <div id="formContent">
                    <h2 className="active">Login</h2>

                    <div className="fadeIn first">
                        <img src={userIcon} id="icon" alt="User Icon"/>
                    </div>

                    <Form value="Login" onSubmit={this.onSubmitHandler}>
                        <input type="text" className="fadeIn second" name="username" placeholder="Username"/>
                        <input type="password" className="fadeIn third" name="password" placeholder="Password"/>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login