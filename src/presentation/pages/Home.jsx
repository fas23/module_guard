import React from "react";
import Image from "react-bootstrap/Image";
import NavBar from "../components/NavBar";
import img from "../../assets/hps.jpg";

const Home = () => {
  return (
    <>
      <Image src={img} width={800} thumbnail className="d-block mx-auto" />
    </>
  );
};

export default Home;
