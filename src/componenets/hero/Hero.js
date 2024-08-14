
import './hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import api from '../../api/axiosconfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";


const Hero = ({movies})  => {
    const { user } = useAuth0();
    const [isClicked, setIsClicked] = useState(false);

   
    async function handleclick(moviename,movieposter) {
        setIsClicked(!isClicked);

        const email= user.email;
        const requestBody = {
            movie: moviename,
            poster: movieposter,
            email: email
        };
        try {
             await api.post("/watchlist",requestBody,{headers: {'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"}});
        } catch (error) {
            console.log(error.response);
        }
    };

    const navigate = useNavigate();

    function reviews(movieId)
    {
        navigate(`/Reviews/${movieId}`);
    }
    const handleCarouselChange = () => {
        setIsClicked(false);  // Reset the isClicked state to false
    };

  return (
    <div className ='movie-carousel-container'>
      <Carousel onChange={handleCarouselChange}>
        {
            movies?.map((movie) =>{
                return(
                    <Paper key={movie.imdbId}>
                        <div className = 'movie-card-container'>
                            <div className="movie-card" style={{"--img": `url(${movie.backdrops[0]})`}}>
                                <div className="movie-detail">
                                    <div className="movie-poster">
                                        <img src={movie.poster} alt="" />
                                    </div>
                                    <div className="movie-title">
                                        <h4>{movie.title}</h4>
                                    </div>
                                    <div className="movie-buttons-container">
                                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                            <div className="play-button-icon-container">
                                                <FontAwesomeIcon className="play-button-icon"
                                                    icon = {faCirclePlay}
                                                />
                                            </div>
                                        </Link>

                                        <div >
                                        <FontAwesomeIcon className={isClicked ? 'wishlist-icon-after':"wishlist-icon" } icon={faBookmark} onClick={()=>handleclick(movie.title,movie.poster)}/>
                                        </div>

                                        <div className="movie-review-button-container">
                                            <Button variant ="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                )
            })
        }
      </Carousel>
    </div>
  )
}

export default Hero
