import ProductsItem from "./ProductsItem";
import productData from "../../data.json";
import { useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

import "./Products.css";

function NextBtn({onClick}) {
  return (
  <button className="glide__arrow glide__arrow--right" onClick={onClick}>
    <i className="bi bi-chevron-right"></i>
  </button>
  );
}
NextBtn.propTypes = {
  onClick: PropTypes.func,
}
PrevBtn.propTypes = {
  onClick: PropTypes.func,
}

function PrevBtn({onClick}) {
  return (
  <button className="glide__arrow glide__arrow--left" onClick={onClick} >
    <i className="bi bi-chevron-left"></i>
  </button>
  );
}

const Products = () => {
    
    


  const [products] = useState(productData);

  const sliderSetting = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    autoplaySpeed:3000,
    autoplay: true,
    responsive : [
      {
        breakpoint: 992,
        settings:{
          slidesToShow:2
        },
      },
      {
        breakpoint: 520,
        settings:{
          slidesToShow:1,
        },
      }
    ]
  };
  return (
    <section className="products">
      
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <div className="glide__track" data-glide-el="track">
            <Slider {...sliderSetting}>
              {products.map((product) => (
                <ProductsItem productItem={product} key={product.id} />
              ))}
            </Slider>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Products;
