import ProductsItem from "./ProductsItem";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { message } from "antd";


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
    
  const [messageApi, contextHolder] = message.useMessage();



  const [products, setProducts] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  
  
    useEffect(() => {
        const fetchProducts = 
      async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);
  
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          messageApi.error("Kullanıcılar alınamadı!");
        }
      } catch (error) {
        console.error("API Hatası:", error);
        messageApi.error("Sunucu hatası oluştu!");
      }
    }
    fetchProducts()
      
    }, [apiUrl,messageApi])

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

    <>
    {contextHolder}
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
                <ProductsItem productItem={product} key={product._id} />
              ))}
            </Slider>
          </div>
          
        </div>
      </div>
    </section>
    
    </>
    
  );
};

export default Products;
