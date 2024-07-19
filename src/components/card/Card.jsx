import { FaCartShopping } from "react-icons/fa6";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";

const Card = ({ product, addToCart }) => {
  return (
    <div className={styles.card}>
      <img
        src={product.image_url}
        alt={product.product_name}
        className={styles.image}
      />
      <h4 className={styles.title}>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h4>
      <p className={styles.description}>{product.description}</p>

      <div className={styles.colors}>
        {product.color_options.map((color, index) => (
          <div
            key={index}
            style={{ background: color }}
            className={styles.color}
          />
        ))}
      </div>

      <strong className={styles.price}>${product.price}</strong>
      <div>
        <button className={styles.button} onClick={() => addToCart(product)}>
          <FaCartShopping />
          <span style={{ marginLeft: "0.8em" }}>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
