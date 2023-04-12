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
  const movie = {
    id: 1,
    title: "The Godfather",
    release: "March 15, 1972",
    genre: "Crime, Drama",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg",
    plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    director: "Francis Ford Coppola",
    duration: "2h 55min",
    rating: "9.2/10",
  };

  return (
    <div className="movie-detail-page">
      <MovieCard movie={movie} />
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
  );
};

export default MovieDetailPage;
