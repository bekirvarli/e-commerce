import { Fragment } from "react";

import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import CampainSingle from "../components/CampainSingle/CampainSingle";


const ShopPage = () => {
  return (
    <Fragment>
      
      <Categories />
      <Products />
      <CampainSingle />
      <Products />

     
    </Fragment>
  );
};

export default ShopPage;
