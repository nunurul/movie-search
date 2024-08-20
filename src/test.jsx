import { useEffect, useState } from "react";
import "./App.css";
import img from "./img/profile.png";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: "c0895a05ec9be10cbd7ee66540f70006",
          query: searchQuery,
        },
      }
    );
    setMovies(response.data.results);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            params: {
              api_key: "c0895a05ec9be10cbd7ee66540f70006",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error(`Terjadi kesalahan pada tampilan`, error);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="logo-text">NunuMovie</h1>
        <div className="search-bar">
          <i className="bx bx-search search-icon"></i>
          <input
            type="text"
            className="search"
            id="search"
            placeholder="Search Movie"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
        <div className="box-profile">
          <i className="bx bxs-cog"></i>
          <i className="bx bxs-bell"></i>
          <img src={img} alt="" className="img-profile" />
        </div>
      </div>
      <div className="main">
        {movies.map((movie) => (
          <div key={movie.id} className="box-movie">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="bg-movie"
            />
            <div className="content">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="detail-img"
              />
              <p className="title">
                {movie.title}{" "}
                <span className="year">
                  (
                  {movie.release_date
                    ? movie.release_date.split("-")[0]
                    : "Unknown"}
                  )
                </span>
              </p>
              <div className="box-star">
                <i className="bx bxs-star"></i>
                <div className="text-star">
                  <p className="number-star">{movie.vote_average.toFixed(1)}</p>
                  <span>/</span>
                  <p className="number-star">10</p>
                </div>
              </div>
              <p className="desc">
                {movie.overview.length > 150
                  ? `${movie.overview.substring(0, 150)}`
                  : movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
