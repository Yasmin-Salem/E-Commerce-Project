/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";

export default function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-5xl">Product Details</h1>

      <div className="flex items-center py-10">
        <div className="w-1/4 py-6">
          <Slider {...settings}>
            {product.images.map((image, index) => (
              <div key={index}>
                <img src={image} className='w-full' alt={`Product image ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-3/4 py-6">
          <h2>{product.title}</h2>
          <p className='my-6 text-gray-500'>{product.description}</p>
          <div className="flex justify-between my-2">
            <h3>{product.price} EGP</h3>
            <h3><i className="fas fa-star rating-color"></i> {product.ratingsAverage}</h3>
          </div>
          <button className='btn w-full bg-main text-white rounded py-1'>Add To Cart</button>
        </div>
      </div>
    </>
  );
}