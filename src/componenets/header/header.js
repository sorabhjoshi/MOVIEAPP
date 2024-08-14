import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import api from "../../api/axiosconfig";
import Navbar from "react-bootstrap/Navbar";
import './header.css'
import { useNavigate, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";
const Header = () => {
  const getwatchlist = async () => {
    if (isAuthenticated && !isLoading) {
      try {
        let email = JSON.stringify(user.email);
        email = email.substring(1, email.length - 1);
        const response = await api.get(`/watchlist/${email}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        navigate('/watchlist', { state: { watchlist: response.data } });
        console.log(response.data);
      } catch (err) {
        console.log(err.response);
      }
      
    }else{
      alert("Please Log In to Get a WatchList");
    }
  };
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, logout, user, isLoading } =
    useAuth0();
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand href="" style={{ color: "gold" }}>
          <FontAwesomeIcon icon={faVideoSlash} />
          <NavLink to="/" className='brand'>
          MyMovies
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link" 
            to="/">
              Home
            </NavLink>
            <NavLink
              className="nav-link"
              onClick={getwatchlist}
            >
              Watch List
            </NavLink>
          </Nav>
          {isAuthenticated ? (
            <Button
              variant="outline-info"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              LogOut
            </Button>
          ) : (
            <Button
              variant="outline-info"
              className="me-2"
              onClick={() => loginWithRedirect()}
            >
              SignUp
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
