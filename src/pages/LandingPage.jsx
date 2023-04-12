import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import './LandingPage.scss'

const LandingPage = () => {
  // Sample movie data
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      poster: "https://via.placeholder.com/150x225.png?text=Poster",
      releaseDate: "1994-10-14",
      language: "English",
      genre: "Drama",
      runtime: "142",
      director: "Frank Darabont",
      cast: "Tim Robbins, Morgan Freeman",
      synopsis:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      rating: "9.3",
      trailer: "https://www.youtube.com/watch?v=6hB3S9bIaco",
    },
    {
      id: 2,
      title: "The Godfather",
      poster: "https://via.placeholder.com/150x225.png?text=Poster",
      releaseDate: "1972-03-24",
      language: "English",
      genre: "Crime, Drama",
      runtime: "175",
      director: "Francis Ford Coppola",
      cast: "Marlon Brando, Al Pacino",
      synopsis:
        "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      rating: "9.2",
      trailer: "https://www.youtube.com/watch?v=sY1S34973zA",
    },
    {
      id: 3,
      title: "The Dark Knight",
      poster: "https://via.placeholder.com/150x225.png?text=Poster",
      releaseDate: "2008-07-18",
      language: "English",
      genre: "Action, Crime, Drama",
      runtime: "152",
      director: "Christopher Nolan",
      cast: "Christian Bale, Heath Ledger",
      synopsis:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      rating: "9.0",
      trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    },
  ]);

  const [filterOptions, setFilterOptions] = useState({
    releaseDate: "All",
    language: "All",
    genre: "All",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  const getFilteredMovies = () => {
    return movies.filter((movie) => {
      if (
        filterOptions.releaseDate !== "All" &&
        movie.releaseDate !== filterOptions.releaseDate
      ) {
        return false;
      }
      if (
        filterOptions.language !== "All" &&
        movie.language !== filterOptions.language
      ) {
        return false;
      }
      if (
        filterOptions.genre !== "All" &&
        !movie.genre.split(", ").includes(filterOptions.genre)
      ) {
        return false;
      }
      return true;
    });
  };

  const filteredMovies = getFilteredMovies();

  return (
    <div className="landing-page">
      <div className="filters">
        <label htmlFor="releaseDate">Release Date:</label>
        <select
          name="releaseDate"
          id="releaseDate"
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="1990-1999">1990-1999</option>
          <option value="2000-2009">2000-2009</option>
          <option value="2010-2019">2010-2019</option>
          <option value="2020-2023">2020-2023</option>
        </select>

        <label htmlFor="language">Language:</label>
        <select name="language" id="language" onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>

        <label htmlFor="genre">Genre:</label>
        <select name="genre" id="genre" onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Drama">Drama</option>
          <option value="Crime">Crime</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
        </select>
      </div>

      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default LandingPage;