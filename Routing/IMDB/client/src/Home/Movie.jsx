import React from 'react';

function Movie(props) {
    const { title, poster, storyLine, trailerUrl, selectMovieStory, selectMovieTrailer } = props;
    const token = sessionStorage.getItem('authToken');

    return (
        <li className="movie">
            <h2>{title}</h2>
            <img src={poster} alt={title + ' image'} />
            {token && <span>
                <button onClick={() => selectMovieTrailer(title, trailerUrl)}>View Trailer</button>
                <button onClick={() => selectMovieStory(title, storyLine)}>View Story Line</button>
            </span>}
        </li>
    )
}

export default Movie;
