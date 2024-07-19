import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FaCartShopping,FaHeart } from "react-icons/fa6";

const baseURL = import.meta.env.VITE_BASE_URL;

const Product = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    async function fetchProductById() {
      try {
        const response = await fetch(`${baseURL}/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching the product:", error);
      }
    }

    fetchProductById();
  }, [productId]);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count > 1 ? count - 1 : 1); 
  };

  if (!product) {
    return <div>Loading...</div>;
  }
const handleAddToCart = () => {
  addToCart({ ...product, quantity: 1 });
};
  return (
    <div className="productContent">
      <div className="product-path">
        <p>
          Products / Gaming Headsets & Audio / <span>{product.name}</span>
        </p>
      </div>

      <div className="product-content">
        <div className="productImage">
          <img
            className="prdctImg"
            src={product.image_url}
            alt={product.product_name}
          />
        </div>
        <div className="productTxt">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="star">
            <FontAwesomeIcon icon={faStar} className="stars" />
            <FontAwesomeIcon icon={faStar} className="stars" />
            <FontAwesomeIcon icon={faStar} className="stars" />
            <FontAwesomeIcon icon={faStar} className="stars" />
            <FontAwesomeIcon icon={faStar} className="stars" />
            ({product.rating_counts})
          </p>

          <div className="price-container">
            <strong>${product.price} or 9.99/month</strong>
            <span className="subPrice">
              Suggested payments with 6 month special financing
            </span>
          </div>

          <div className="color-container">
            <p>Choose a color</p>
            <div className="color-circle">
              {product.color_options.map((color, index) => (
                <div
                  key={index}
                  style={{ background: color }}
                  className="color"
                />
              ))}
            </div>
          </div>

          <div className="quantity">
            <div className="counter">
              <button className="counterBtn" onClick={decrease}>
                -
              </button>
              <h1>{count}</h1>
              <button className="counterBtn" onClick={increase}>
                +
              </button>
            </div>

            <p>
              Only <span>16 items</span> left! <br />
              Don’t miss it
            </p>
          </div>

          <div className="buttons-container">
            <button
              className="cart"
              onClick={() => addToCart({ ...product, quantity: count })}
            >
              <FaCartShopping />
              <span style={{ marginLeft: "0.8em" }}>Add to Cart</span>
            </button>

            <div className="heart" size="xl">
              <FaHeart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
  