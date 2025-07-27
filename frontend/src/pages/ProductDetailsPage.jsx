import Footer from "../components/Layout/Footer/Footer"
import Header from "../components/Layout/Header/Header"
import ProductDetails from "../components/ProductDetails/ProductDetails"
import React from "react"
const ProductDetailsPage = () => {
  return (
    <React.Fragment>
        <Header/>
        <ProductDetails/>
        <Footer/>
    </React.Fragment>
  )
}

export default ProductDetailsPage