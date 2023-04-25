import React, { useEffect, useState } from "react";
import axios from "axios";
import "./movieForm.scss";
function MovieForm() {
    const [title, setTitle] = useState("");
    const [release, setRelease] = useState("");
    const [duration, setDuration] = useState("");
    const [rating, setRating] = useState("");
    const [director, setDirector] = useState("");
    const [genre, setGenre] = useState("");
    const [poster, setPoster] = useState("");
    const [leadActor, setLeadActor] = useState("");
    const [leadActress, setLeadActress] = useState("");
    const [plot, setPlot] = useState("");    
    async function submit(e) {
        e.preventDefault();
        if (isNaN(duration)) {
            alert("Duration must be a number");
            return;
        }
        if (isNaN(rating) || rating < 0 || rating > 10) {
            alert("IMDB rating must be a number between 0 and 10");
            return;
        }
        if(genre!== "Action" && genre!== "Comedy" && genre!== "Drama" && genre!== "Horror" && genre!== "Romance" && genre!== "Thriller" && genre!== "Sci-Fi"){
            alert("Genre must be Action, Comedy, Drama, Horror, Romance, Thriller or Sci-Fi");
            return;
        }
        try {
            await axios
                .post("http://localhost/movieForm", {
                    title,
                    duration,
                    release,
                    rating,
                    director,
                    genre,
                    leadActor,
                    leadActress,
                    plot,
                    poster
                })
                .then((res) => {
                    if (res.data === "exist") {
                        alert("Movie already exists");
                    } else if (res.data === "notexist") {
                        alert("Movie added successfully");
                    }
                })
                .catch((e) => {
                    alert("Error filling up movie details");
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="movieForm">
            <h1>Add movie details</h1>
            <form method="post">
                <label>
                    Movie Name
                    <input
                        type="text"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        placeholder="Movie Name"
                        required
                    />
                </label>
                <label>
                    Duration
                    <input
                        type="text"
                        onChange={(e) => {
                            setDuration(e.target.value);
                        }}
                        placeholder="Duration"
                        required
                    />
                </label>
                <label>
                    Current IMDB rating
                    <input
                        type="text"
                        onChange={(e) => {
                            setRating(e.target.value);
                        }}
                        placeholder="IMDB Rating"
                        required
                    />
                </label>
                <label>
                    Movie Poster
                    <input
                        type="text"
                        onChange={(e) => {
                            setPoster(e.target.value);
                        }}
                        placeholder="Movie Poster"
                        required
                    />
                </label>
                <label>
                    Director Name
                    <input
                        type="text"
                        onChange={(e) => {
                            setDirector(e.target.value);
                        }}
                        placeholder="Director Name"
                        required
                    />
                </label>
                <label>
                    Genre
                    <input
                        type="text"
                        onChange={(e) => {
                            setGenre(e.target.value);
                        }}
                        placeholder="Genre"
                        required
                    />
                </label>
                <label>
                    Lead Actor
                    <input
                        type="text"
                        onChange={(e) => {
                            setLeadActor(e.target.value);
                        }}
                        placeholder="Lead Actor Name"
                        required
                    />
                </label>
                <label>
                    Lead Actress
                    <input
                        type="text"
                        onChange={(e) => {
                            setLeadActress(e.target.value);
                        }}
                        placeholder="Lead Actress Name"
                        required
                    />
                </label>
                <label>
                    Plot
                    <input
                        type="textarea"
                        onChange={(e) => {
                            setPlot(e.target.value);
                        }}
                        placeholder="Description"
                        required
                    />
                </label>
                <label>
                    Enter the release date
                    <input
                        type="text"
                        onChange={(e) => {
                            setRelease(e.target.value);
                        }}
                        placeholder="Release date"
                        required
                    />
                </label>
                <input type="submit" onClick={submit} />
            </form>
            <br />
            {/* <p>Already an existing user ?</p>
            <Link to="/login">Login</Link> */}
        </div>
    );
}
export default MovieForm;
