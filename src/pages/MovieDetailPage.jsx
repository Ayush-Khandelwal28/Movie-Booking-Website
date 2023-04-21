import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./MovieDetailPage.scss";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  function redirectToSeatSelection() {
    navigate(`/seat-selection/${id}`);
  }
  
  const movie ={
    id: 1,
    title: "Avengers: Endgame",
    release: "April 26, 2019",
    genre: "Action, Adventure, Sci-Fi",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    plot:
      "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    cast: [
      "Robert Downey Jr.",
      "Chris Evans",
      "Mark Ruffalo",
      "Chris Hemsworth",
    ],
    director: "Anthony Russo, Joe Russo",
    duration: "3h 1min",
    rating: "8.4/10",
  };

  return (
    <div className="movie-detail-page">
      <div className="movie-container">
        <div className="poster-container">
          <img className="poster" src={movie.poster} alt={movie.title} />
        </div>
        <div className="movie-details">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-release">{movie.release}</p>
          <p className="movie-genre">{movie.genre}</p>
          <p className="movie-plot">{movie.plot}</p>
          <div className="movie-cast">
            <h4>Cast:</h4>
            <ul>
              {movie.cast.map((actor) => (
                <li key={actor}>{actor}</li>
              ))}
            </ul>
          </div>
          <p className="movie-director">
            <strong>Director:</strong> {movie.director}
          </p>
          <p className="movie-duration">
            <strong>Duration:</strong> {movie.duration}
          </p>
          <p className="movie-rating">
            <strong>IMDb Rating:</strong> {movie.rating}
          </p>
          <button className="btn btn-primary" onClick={redirectToSeatSelection}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
