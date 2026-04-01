import { useState } from 'react'
import './App.css';

function App() {

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API_KEY = "c967cded";

  const searchMovies = async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
    );

    const data = await response.json();
    setMovies(data.Search || []);
  };

  const getMovieDetails = async (id) => {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
    );

    const data = await response.json();
    setSelectedMovie(data);
  };

 return (
  <div className="container">

  {!selectedMovie ? (
    <>
      <h1>Movie Search App</h1>

      <input
        className="box"
        type="text"
        placeholder="Search movie"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={searchMovies}>Search</button>

      <div className="movies">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="movie-card"
            onClick={() => getMovieDetails(movie.imdbID)}
          >
            <img src={movie.Poster} width="150" />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </>
  ) : (

    <div className="movie-details">
      <button onClick={() => setSelectedMovie(null)}>
        Back
      </button>

      <h2>{selectedMovie.Title}</h2>
      <img src={selectedMovie.Poster} width="200" />

      <p><b>Year:</b> {selectedMovie.Year}</p>
      <p><b>Genre:</b> {selectedMovie.Genre}</p>
      <p><b>Plot:</b> {selectedMovie.Plot}</p>

    </div>

  )}

  </div>
);    
}

export default App;