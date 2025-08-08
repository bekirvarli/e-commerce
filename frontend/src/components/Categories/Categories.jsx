import CategoryItem from "./CategoryItem";
import { useEffect, useState } from "react";
import "./Categories.css";
import { message } from "antd";

const Categories = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [categories, setCategories] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();



  useEffect(() => {
      const fetchCategories = 
    async () => {
    try {
      const response = await fetch(`${apiUrl}/api/categories`);

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        messageApi.error("Kullanıcılar alınamadı!");
      }
    } catch (error) {
      console.error("API Hatası:", error);
      messageApi.error("Sunucu hatası oluştu!");
    }
  }
  fetchCategories()
    
  }, [apiUrl,messageApi])
  

  return (
    <>
      {contextHolder}
      <section className="categories">
        <div className="container">
          <div className="section-title">
            <h2>All Categories</h2>
            <p>Summer Collection New Morden Design</p>
          </div>
          <ul className="category-list">
            
            {categories.map((category) => (
              <CategoryItem key={category._id} category={category}/>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Categories;
