import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./products.css"

function Products() {
  const [selectedButton, setSelectedButton] = useState("");

  // Get the current location
  const location = useLocation();

  // Function to handle button click and update selectedButton state
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div className="products">
      <div className="productsNav">
        <Link
          to="/products/search"
          onClick={() => handleButtonClick("search")}
          className={location.pathname === "/products/search" ? "active" : "inactive"}
        >
          Search
        </Link>
        <Link
          to="/products/list"
          onClick={() => handleButtonClick("list")}
          className={location.pathname === "/products/list" ? "active" : "inactive"}
        >
          List
        </Link>
        <Link
          to="/products/add"
          onClick={() => handleButtonClick("add")}
          className={location.pathname === "/products/add" ? "active" : "inactive"}
        >
          Add
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Products;
