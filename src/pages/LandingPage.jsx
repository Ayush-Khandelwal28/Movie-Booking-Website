import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import './LandingPage.scss'

const LandingPage = () => {
  // Sample movie data
  const [movies, setMovies] = useState([]);
  const [date,setDate] = useState((new Date()).toLocaleDateString().split('/'));
  const [time,setTime] = useState("morning");

  function handleDate(event){
    setDate(event.target.value.split('/'));
  }

  function handleTime(event){
    setTime(event.target.value);
  }

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch("/movies");
      const data = await response.json();
      setMovies(data);
    }
    fetchMovies();
  }, []);

 const today = new Date(); // Get today's date
const nextFiveDays = Array.from({ length: 5 }, (_, i) => { 
  const date = new Date();
  date.setDate(today.getDate() + i);
  return date;
}); // Create an array of next 5 days

  return (
    <div className="landing-page">
      <div className="filters">
        <label htmlFor="releaseDate">Movie date:</label>
        <select
          name="releaseDate"
          id="releaseDate"
          onChange={handleDate}
        >
          {nextFiveDays.map((date, index) => (
  <option key={index} value={date.toISOString()}>
    {date.toLocaleDateString()}
  </option>))}
        </select>

        <label htmlFor="genre">Time:</label>
        <select name="genre" id="genre" onChange={handleTime}>
          <option value="Morning">10:00 AM - 14:00 PM</option>
          <option value="Afternoon">15:00 PM - 18:00 PM</option>
          <option value="Evening">19:00 PM - 21:00 PM</option>
          <option value="Night">22:00 PM - 11:59 PM</option>
        </select>
      </div>

      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movie/${movie._id}/${date}/${time}`} key={movie.id} className="link__">
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default LandingPage;