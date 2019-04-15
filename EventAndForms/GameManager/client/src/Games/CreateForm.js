import React from 'react';

class CreateForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            imageUrl: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.props.createGame({
            title: this.state.title,
            description: this.state.description,
            imageUrl: this.state.imageUrl
        });

        this.setState({
            title: '',
            description: '',
            imageUrl: ''
        });
    }

    render() {
        const { title, description, imageUrl } = this.state;

        return (
            <div className="create-form">
                <h1>Create game</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <label>Title</label>
                    <input type="text" value={title} onChange={this.onChangeHandler} name="title" id="title" />
                    <label>Description</label>
                    <textarea type="text" value={description} onChange={this.onChangeHandler} name="description" id="description" />
                    <label>ImageUrl</label>
                    <input type="text" value={imageUrl} onChange={this.onChangeHandler} name="imageUrl" id="imageUrl" />
                    <input type="submit" value="Create" />
                </form>
            </div>
        )
    }
};

export default CreateForm;

