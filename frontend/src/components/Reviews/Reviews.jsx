import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import "./Reviews.css";
import PropTypes from "prop-types";
const Reviews = ({active, singleProduct}) => {
  return (
    
    <div className={`tab-panel-reviews ${active}`}>
      {singleProduct.reviews.length > 0 ? <div className="comments">
      <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
        <ol className="comment-list">
          {singleProduct.reviews.map((item,index) => (

            <ReviewItem key={index} item={item}/>

          ))}
          <ReviewItem/>
          
          
        </ol>
      </div> : <h3>Hiç yorum yok</h3>}
      

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm singleProduct={singleProduct}/>
      </div>
    </div>
  );
};

export default Reviews;

Reviews.propTypes = {
  active : PropTypes.string,
  singleProduct: PropTypes.object
} 