import React, { Component } from 'react';

export class BoundForm extends Component {
    constructor(props) {
        super(props);
        this.state = getState(this.props.children);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <form onSubmit={(e) => this.props.onSubmit(e, this.state)}>
                {React.Children.map(this.props.children, (child) => {
                    if (child.type === 'input' && child.props.name) {
                        return React.cloneElement(child, { onChange: this.onChangeHandler, ...child.props });
                    }
                    return child;
                })}
                <input type="submit" value="Register" />
            </form>
        )
    }
}

function getState(children) {
    const obj = {};

    React.Children.map(children, child => {
        if (child.type === 'input' && child.props.name) {
            obj[child.props.name] = '';
        }
    });

    return obj;
}

export default BoundForm;
