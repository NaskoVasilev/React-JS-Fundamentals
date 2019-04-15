import React from "react";
import RegisterForm from "./RegisterForm";
import LogInForm from "./LoginForm";
import CreateForm from "../Games/CreateForm";

class DynamicForm extends React.Component {

    render() {
        const {loginForm, user, loginUser, registerUser, createGame} = this.props;
        let renderBody = <RegisterForm registerUser={registerUser}/>
        if (loginForm) {
            renderBody = <LogInForm loginUser={loginUser}/>;
        }

        if (user) {
            renderBody = <CreateForm createGame={createGame}/>;
        }

        return (
            <div>
                <div>
                    {}
                    {renderBody}
                </div>
            </div>
        )
    }
}

export default DynamicForm