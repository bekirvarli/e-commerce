import Blogs from "../components/Blogs/Blogs";
import Brands from "../components/Brands/Brands";
import Campaigns from "../components/Campaigns/Campaigns";
import CampainSingle from "../components/CampainSingle/CampainSingle";
import Categories from "../components/Categories/Categories";

import Products from "../components/Products/Products";
import Sliders from "../components/Slider/Sliders";
import React from "react";
const HomePage = () => {
  return (
    <React.Fragment>
      
      <Sliders />
      <Categories />
      <Products />
      <Campaigns />
      <Products />
      <Blogs />
      <Brands />
      <CampainSingle />
      
      
    </React.Fragment>
  );
};

export default HomePage;
