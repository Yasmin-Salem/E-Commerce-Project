import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function AllProducts() {
  let { addProductToCart, loading } = useContext(CartContext);
  const { addToWishlist, wishlistCheck, removeFromWishlist } =
    useContext(WishlistContext);
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);

  async function getProducts() {
    try {
      setLoad(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, [wishlistCheck]);

  return (
    <>
      {!load ? (
        <div className=" px-2 py-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="product relative duration-500 cursor-pointer flex flex-col justify-between"
              >
                <i
                  onClick={() => {
                    wishlistCheck.some((i) => i === product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product.id);
                  }}
                  className={`fa-solid fa-heart ${
                    wishlistCheck.some((i) => i == product.id)
                      ? "text-red-500 "
                      : "hover:text-red-500"
                  } absolute top-2 right-2 duration-300 text-2xl`}
                ></i>
                <Link to={`details/${product.id}`}>
                  <div>
                    <img
                      loading="lazy"
                      src={product.imageCover}
                      className="w-full"
                      alt={product.title}
                    />
                  </div>
                  <div className="p-2">
                    <h2 className="text-main text-sm">
                      {product.category.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {product.description.split(" ").slice(0, 3).join(" ")}
                    </p>
                    <div className="flex justify-between my-2 ">
                      <span>{product.price}EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-2 pt-0">
                  {loading ? (
                    <button
                      type="button"
                      className="bg-green-500 w-full p-2 rounded text-white btn"
                    >
                      <i className="fas fa-spinner fa-spin-pulse"></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="btn w-full bg-main text-white rounded py-1"
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}