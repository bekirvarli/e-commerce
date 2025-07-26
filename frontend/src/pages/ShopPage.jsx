import { Fragment } from "react";
import Header from "../components/Layout/Header/Header";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import CampainSingle from "../components/CampainSingle/CampainSingle";
import Policy from "../components/Layout/Policy/Policy";
import Footer from "../components/Layout/Footer/Footer";

const ShopPage = () => {
  return (
    <Fragment>
      <Header />
      <Categories />
      <Products />
      <CampainSingle />
      <Products />

      <Footer />
    </Fragment>
  );
};

export default ShopPage;
