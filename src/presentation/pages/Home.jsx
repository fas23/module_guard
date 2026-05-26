import React from "react";
import Image from "react-bootstrap/Image";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <>
      <Image
        src="src/assets/hps.jpg"
        width={800}
        thumbnail
        className="d-block mx-auto"
      />
    </>
  );
};

export default Home;
