import React from "react";
import { useLocation } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import './Watchlist.css';

const Watchlist = () => {
  const location = useLocation();
  const { watchlist } = location.state || {};

  if (!watchlist) {
    return <p>No watchlist data available.</p>;
  }

  return (
    <Container>
      <Row>
        {watchlist.map((item, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="small-card">
              <Card.Img variant="top" src={item.poster} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.movieName}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Watchlist;
