import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./components/home/Home";
import Products from "./components/products/Products";
import Product from "./components/product/Product";
import Cart from "./components/cart/Cart"; // Import Cart component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCartShopping,
  faPhone,
  faUser,
  faAmericanSignLanguageInterpreting,
  faEarth,
} from "@fortawesome/free-solid-svg-icons";
import gg from "./assets/GG.png";
import GameGeek from "./assets/GameGeek.png";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (product) => product.id === productToAdd.id
      );
      if (existingProduct) {
        return prevCart.map((product) =>
          product.id === productToAdd.id
            ? { ...product, quantity: product.quantity + productToAdd.quantity }
            : product
        );
      } else {
        return [...prevCart, productToAdd];
      }
    });
  };

  return (
    <Router>
      <div className="subheader">
        <div className="container">
          <img src={gg} alt="GG Logo" />

          <div className="phone">
            <FontAwesomeIcon className="phone-icon" icon={faPhone} inverse />{" "}
            +4904-049-950
          </div>

          <div className="sale">
            <span className="sale-text">Get 50% Off on the Selected items</span>
            <p href="#">Shop now</p>
          </div>

          <div className="language">
            <select name="" id="">
              <option value="English">
                English
                <FontAwesomeIcon icon={faAmericanSignLanguageInterpreting} />
              </option>
              <option value="German">German</option>
            </select>

            <FontAwesomeIcon className="planet" icon={faEarth} />
            <p>Location</p>
          </div>
        </div>
      </div>
      <div className="container">
        <header>
          <nav className="navbar">
            <img src={GameGeek} alt="GameGeek Logo" />
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "activeLink" : "")}
                  to="/"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "activeLink" : "")}
                  to="/products"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink to="/our-story">What’s new</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Sales</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Help</NavLink>
              </li>
              <li>
                <NavLink to="/contact">About</NavLink>
              </li>
            </ul>
            <div className="iconbar">
              <a className="icons">
                <FontAwesomeIcon icon={faSearch} size="l" />
              </a>
              <a href="#" className="icons">
                <FontAwesomeIcon icon={faUser} size="l" />
              </a>
              <NavLink to="/cart" className="icons cart">
                <FontAwesomeIcon icon={faCartShopping} size="l" />
                {cart.length > 0 && (
                  <span className="cart-count">{cart.length}</span>
                )}
              </NavLink>
            </div>
          </nav>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={<Products cart={cart} setCart={setCart} />}
        />
        <Route
          path="/products/:productId"
          element={<Product addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
