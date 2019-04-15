import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import { getMovies } from '../api/remote';
import Movie from './Movie';
import './Home.css'

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movies: [],
			selectedMovie: {}
		}

		this.selectMovieStory = this.selectMovieStory.bind(this);
		this.selectMovieTrailer = this.selectMovieTrailer.bind(this);
	}

	componentDidMount() {
		getMovies()
			.then(json => {
				this.setState({ movies: json.movies });
			});
	}

	selectMovieStory(title, storyLine) {
		this.setState({ selectedMovie: { title, storyLine } });
	}

	selectMovieTrailer(title, trailerUrl) {
		this.setState({ selectedMovie: { title, trailerUrl } });
	}

	render() {
		const { movies, selectedMovie } = this.state;
		const loggedIn = sessionStorage.getItem('authToken');

		return (
			<div className="Home">
				<h1>All movies</h1>
				{loggedIn && selectedMovie.title && selectedMovie.storyLine &&
					<span>
						<h2>Story line of {selectedMovie.title}</h2>
						{selectedMovie.storyLine && <p>{selectedMovie.storyLine}</p>}
					</span>
				}
				{loggedIn && selectedMovie.title && selectedMovie.trailerUrl &&
					<span>
						<h2>Trailer line of {selectedMovie.title}</h2>
						{selectedMovie.trailerUrl && <ReactPlayer url={selectedMovie.trailerUrl} style={{margin: '0 auto'}}/>}
					</span>
				}
				<ul className="movies">
					{movies.map(m => {
						return (
							<Movie
								key={m._id}
								title={m.title}
								poster={m.poster}
								storyLine={m.storyLine}
								trailerUrl={m.trailerUrl}
								selectMovieStory={this.selectMovieStory}
								selectMovieTrailer={this.selectMovieTrailer}
							/>
						)
					})}
				</ul>
			</div>
		);
	}
}

export default Home;
