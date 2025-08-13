import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import "./Reviews.css";
import PropTypes from "prop-types";
import { message } from "antd";
const Reviews = ({active, singleProduct, setSingleProduct}) => {
  const [users, setusers] = useState([]);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const [messageApi, contextHolder] = message.useMessage();
      const thisReview =[];



  useEffect(() => {
    const fetchUsers = async () => {
      
        try {
          const response = await fetch(`${apiUrl}/api/users`);
    
          if (response.ok) {
            const data = await response.json();
            setusers(data);
          } else {
            messageApi.error("Kullanıcılar alınamadı!");
          }
        } catch (error) {
          console.error("API Hatası:", error);
          messageApi.error("Sunucu hatası oluştu!");
        } 
      }
      fetchUsers()
  }, [apiUrl,messageApi])
  
singleProduct.reviews.forEach((review) => {
  const matchingUsers = users?.filter((user) => user._id === review.user);
  matchingUsers.forEach((matchingUser) =>  {
    thisReview.push(({
      review: review,
      user: matchingUser,
    }))
  })
})


  return (
    <>
    {contextHolder}
    <div className={`tab-panel-reviews ${active}`}>
      {singleProduct.reviews.length > 0 ? <div className="comments">
      <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
        <ol className="comment-list">
          {thisReview.map((item,index) => (

            <ReviewItem key={index} item={item} reviewItem ={item}/>

          ))}
          
          
        </ol>
      </div> : <h3>Hiç yorum yok</h3>}
      

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm singleProduct={singleProduct} setSingleProduct={setSingleProduct}/>
      </div>
    </div>
    </>
    
    
  );
};

export default Reviews;

Reviews.propTypes = {
  active : PropTypes.string,
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func
} 


