import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "./MovieDetailPage.scss";

const MovieDetailPage = () => {
  const { id,date,time } = useParams();
  const navigate = useNavigate();
  
  function redirectToSeatSelection() {
    navigate(`/seat-selection/${id}/${date}/${time}`);
  }
  
  const [movie,setMovie] = useState({});

  useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get(`/movies/${id}`);
      const data = await response.data;
      console.log(data);
      setMovie(data);
    }
    fetchMovie();
  }, [id]);

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
                <li key={movie.leadActor}>{movie.leadActor}</li>
                <li key={movie.leadActress}>{movie.leadActress}</li>
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
