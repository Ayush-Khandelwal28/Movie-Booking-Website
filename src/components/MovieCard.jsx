import React from 'react';
import PropTypes from 'prop-types';
import './MovieCard.scss';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img className="movie-poster" src={movie.poster} alt={movie.title} />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-release">{movie.release}</p>
        <p className="movie-genre">{movie.genre}</p>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
