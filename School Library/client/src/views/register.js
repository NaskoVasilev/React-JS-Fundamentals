import React, {Component} from 'react';
import userIcon from '../images/userIcon.png';
import Form from '../components/form';

class Register extends Component {
    constructor(props){
        super(props)

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(e, data) {
        e.preventDefault();
        const { firstName, lastName,  username, studentClass, numberInClass, password, repeatPassword  } = data;
        this.props.registerHandler({ firstName, lastName,  username, studentClass, numberInClass, password, repeatPassword });
    }

    render() {
        return (
            <div className="wrapper fadeInDown" id="register-form">
                <div id="formContent">
                    <h2 className="active">Register</h2>

                    <div className="fadeIn first">
                        <img src={userIcon} id="icon" alt="User Icon"/>
                    </div>

                    <Form value="Register" onSubmit={this.onSubmitHandler}>
                        <input type="text" className="fadeIn second" name="firstName" placeholder="First name"/>
                        <input type="text" className="fadeIn second" name="lastName" placeholder="Last name"/>
                        <input type="text" className="fadeIn second" name="username" placeholder="Username"/>
                        <input type="number" className="fadeIn third" name="studentClass" placeholder="Class"/>
                        <input type="number" className="fadeIn third" name="numberInClass"
                               placeholder="Number in class"/>
                        <input type="password" className="fadeIn third" name="password"
                               placeholder="Password"/>
                        <input type="password" className="fadeIn third" name="repeatPassword"
                               placeholder="Confirm Password"/>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Register