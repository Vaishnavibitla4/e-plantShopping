import React, { useState } from 'react';
import './ProductList.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);

  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart(prev => ({
      ...prev,
      [product.name]: true,
    }));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleHome = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        }
      ]
    }
    // (Other categories remain unchanged)
  ];

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo" onClick={handleHome}>
          <h3>Paradise Nursery</h3>
          <i>Where Green Meets Serenity</i>
        </div>

        <div className="nav-links">
          <a href="#" onClick={handlePlantsClick}>Plants</a>

          <a href="#" onClick={handleCartClick} className="cart-icon">
            🛒
            <span className="cart-count">{calculateTotalQuantity()}</span>
          </a>
        </div>
      </div>

      {/* PRODUCT LIST */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>{category.category}</h1>

              <div className="product-list">
                {category.plants.map((plant, idx) => (
                  <div className="product-card" key={idx}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <div className="product-cost">{plant.cost}</div>

                    <button
                      className={
                        addedToCart[plant.name]
                          ? "product-button disabled"
                          : "product-button"
                      }
                      disabled={addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
