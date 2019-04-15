import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { createMovie } from '../api/remote';
import './Create.css';

class Create extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			storyLine: '',
			trailerUrl: '',
			poster: '',
		};

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);
	}

	componentDidMount() {
		const isAdmin = sessionStorage.getItem('isAdmin');
		if (!isAdmin || isAdmin === 'false') {
			toast.error('You are not admin.');
			this.props.history.push('/');
		}
	}

	onChangeHandler(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmitHandler(e) {
		e.preventDefault();
		const { title, storyLine, trailerUrl, poster } = this.state;
		createMovie({ title, storyLine, trailerUrl, poster })
			.then((json) => {
				toast.success(json.message);
				this.props.history.push('/');
			});
	}

	render() {
		const { title, storyLine, trailerUrl, poster } = this.state;

		return (
			<div className="Create">
				<div className="Create">
					<h1>Create Movie</h1>
					<form onSubmit={this.onSubmitHandler}>
						<label htmlFor="title">Title</label>
						<input type="text" name="title" onChange={this.onChangeHandler} value={title} id="title" placeholder="Titanic" />
						<label htmlFor="storyLine">Story Line</label>
						<input type="text" name="storyLine" onChange={this.onChangeHandler} value={storyLine} id="storyLine" placeholder="Text" />
						<label htmlFor="trailerUrl">Trailer Url</label>
						<input type="text" name="trailerUrl" onChange={this.onChangeHandler} value={trailerUrl} id="trailerUrl" placeholder="https://www.youtube.com/watch?v=DNyKDI9pn0Q" />
						<label htmlFor="poster">Movie Poster</label>
						<input type="text" name="poster" onChange={this.onChangeHandler} value={poster} id="poster" placeholder="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRzg6o0KjhufKFU1iBNr1zuyi0YDNgCUw4Ky5SNATZDVKaIUkiAA" />
						<input type="submit" value="Create" />
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(Create);
