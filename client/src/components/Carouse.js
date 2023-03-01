import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import bb1 from "../images/bb1.jpg";
import bb2 from "../images/bb2.jpg";
import bb3 from "../images/bb3.jpg";
export default function Carouse() {
  return (
    <Container>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          height="450px"
          src={bb1}
          style={{backgroundStyle:"cover" , backgroundPosition:"center"}}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          height="450px"
          src={bb2}
          style={{backgroundStyle:"cover" , backgroundPosition:"center"}}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
           style={{backgroundStyle:"cover" , backgroundPosition:"center"}}
          className="d-block w-100 "
          height="450px"
          src={bb3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </Container>
  );
}
