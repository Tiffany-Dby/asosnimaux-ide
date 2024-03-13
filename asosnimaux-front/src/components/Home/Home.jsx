// Styles
import "./home.scss";
// Components
import Banner from '../Banner/Banner';
import HomeTestimonies from "../HomeTestimonies/HomeTestimonies";
import HomeArticles from "../HomeArticles/HomeArticles";
import Informations from "../Informations/Informations";
// React
import React from "react";

const Home = () => {
  return (
    <React.Fragment>
      <Banner />
      <HomeTestimonies />
      <HomeArticles />
      <Informations />
    </React.Fragment>
  );
}

export default Home;