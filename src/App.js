import api from "./api/axiosconfig";
import "./App.css";
import { useState, useEffect } from "react";
import Layout from "./componenets/Layout";
import Home from "./componenets/Home";
import Wishlist from "./componenets/Watchlist/Watchlist";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./componenets/header/header";
import Trailer from "./componenets/trailer/Trailer";
import Reviews from "./componenets/reviews/Reviews";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [movies, setmovies] = useState(Array);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getmovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setmovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviews);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getmovies();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/watchlist" element={<Wishlist />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
