/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import './style.css';

export default function RecentProduct({ product }) {

  const { addProductToCart } = useContext(CartContext);

  if (!product) {
    return <div>No product data available</div>;
  }

  const { imageCover, title } = product;

  return (
    <div className="w-1/6 px-2 py-4 product">
      <div>
        <Link to={`productDetails/${product.id}`}>
          <img src={imageCover} className="w-full" alt={title} />
          <h2 className='text-main text-sm'> {product.category.name}</h2>
          <h2 className='font-medium'> {product.title.split(' ').slice(0, 2).join(' ')}</h2>
          <div className="flex justify-between my-2">
            <h3>{product.price} EGP</h3>
            <h3> <i className="fas fa-star rating-color" ></i> {product.ratingsAverage}</h3>
          </div>
        </Link>
        <button 
          onClick={() => addProductToCart(product.id)} 
          className='btn w-full bg-main text-white rounded py-1'>
          Add To Cart
        </button>
      </div>
    </div>
  );
}