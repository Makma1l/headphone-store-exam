import { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import Card from "../card/Card"; 
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../store/productsSlice";

const baseURL = import.meta.env.VITE_BASE_URL;

const Products = ({ cart, setCart }) => {
  const products = useSelector((store) => store.productsReducer.products);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      const response = await fetch(`${baseURL}/brands`);
      const data = await response.json();
      setBrands(data);
    }

    async function fetchColors() {
      const response = await fetch(`${baseURL}/colors`);
      const data = await response.json();
      setColors(data);
    }

    fetchBrands();
    fetchColors();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      let query = `${baseURL}/products`;

      const params = [];
      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(`${query}`);
        const data = await response.json();
        dispatch(addProducts(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedBrand, selectedColor, dispatch]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedProducts = () => {
    if (sortOption === "highest") {
      return [...products].sort((a, b) => b.price - a.price);
    } else if (sortOption === "lowest") {
      return [...products].sort((a, b) => a.price - b.price);
    }
    return products;
  };

  return (
    <div>
      <div className={styles.sortByPrice}>
        <p>Filter By:</p>

        <select
          name="price"
          id="price"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Sort By</option>
          <option value="highest">From expensive</option>
          <option value="lowest">From cheapest</option>
        </select>
      </div>

      <div className={styles.container}>
        <aside>
          <div>
            <h3>BRAND</h3>
            <ul>
              {brands.map((brand, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    value={brand}
                    name="brand"
                    id={brand}
                    checked={brand === selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                  <label htmlFor={brand}>{brand}</label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>COLORS</h3>
            <ul className={styles.colorsContainer}>
              {colors.map((color, index) => (
                <li key={index}>
                  <div
                    style={{
                      background: color,
                      outline:
                        selectedColor === color ? "3px solid #14FF00" : "",
                    }}
                    className={styles.color}
                    onClick={() => setSelectedColor(color)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="cards">
          {loading ? (
            <p>Loading...</p>
          ) : sortedProducts().length ? (
            <div className={styles.grid} style={{ width: "1000px" }}>
              {sortedProducts().map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  addToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <p>No products</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
