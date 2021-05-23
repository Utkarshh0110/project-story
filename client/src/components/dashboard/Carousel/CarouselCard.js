import React from "react";
import { Carousel } from "react-bootstrap";
import img from './money.png'
const CarouselCard = () => {
  return (
    <Carousel.Item>
    <img
      className="d-block w-100"
      src={img}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slidffffe label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  );
};

export default CarouselCard;
