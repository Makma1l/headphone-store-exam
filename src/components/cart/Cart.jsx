import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./Cart.module.scss";

const Cart = ({ cart, setCart }) => {
  const totalSum = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const increase = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cartMain}>
        <Link to="/products">
          <FontAwesomeIcon icon={faLongArrowLeft} />
          Back to Shopping
        </Link>
        <h2>Shopping Cart</h2>
        <div className={styles.cartInfo}>
          <p className={styles.one}>Product</p>
          <p className={styles.two}>Quantity</p>
          <p className={styles.three}>Price</p>
        </div>
        {cart.map((item) => (
          <div className={styles.productCart} key={item.id}>
            <img src={item.image_url} alt={item.product_name} />
            <div className={styles.producCartTxt}>
              <p>{item.brand_name}</p>
              <span>{item.name}</span>
              <h5>Black</h5>
              <h4>In Stock</h4>
            </div>
            <div className={styles.counter}>
              <button
                className={styles.counterBtn}
                onClick={() => decrease(item.id)}
              >
                -
              </button>
              <h1>{item.quantity}</h1>
              <button
                className={styles.counterBtn}
                onClick={() => increase(item.id)}
              >
                +
              </button>
            </div>
            <strong>${item.price}</strong>
          </div>
        ))}
      </div>
      <div className={styles.cartSum}>
        <div className="cartTitle">
          <h4>Cart Totals</h4>
        </div>
        <p>
          Shipping (3-5 Business Days) <span className={styles.free}>Free</span>
        </p>
        <p>
          TAX (estimated for the United States (US)) <span>$0</span>
        </p>
        <p>
          Subtotal{" "}
          <span className={styles.subtotal}>${totalSum.toFixed(2)}</span>
        </p>
        <h3>
          Total <strong>${totalSum.toFixed(2)}</strong>
        </h3>

        <button>PROCEED TO CHECKOUT</button>

        <Link className={styles.link} to="/products">
          <FontAwesomeIcon icon={faLongArrowLeft} />
          Back to Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
