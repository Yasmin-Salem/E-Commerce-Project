/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import style from './PopularCategories';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 1000,
};

export default function CatrgoriesSlider() {
  const [categories, setCategories] = useState([]);

  async function getRecentProducts() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      console.log(data); 
      setCategories(data.data); 
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  useEffect(() => {
    getRecentProducts();
  }, []);

  if (!categories.length) {
    return (
      <div className="py-16 text-center">
        <i className='fas fa-spinner fa-spin-pulse fa-4x'></i>
      </div>
    );
  }

  return (
    <>
    
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div key={index} className=" my-4">
            <img src={category.image} alt={category.name} className="w-full h-[200px] \" />
            <h3>{category.name}</h3>
          </div>
        
        ))}
      </Slider>
    </>
  );
}