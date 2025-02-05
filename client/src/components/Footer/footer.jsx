import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import "../../styles/global.css";
import logo from "../../assets/images/logo 1.png";

export const Footer = () => {
  return (
    <footer className="py-2 px-1" style={{ height: "94px" }}>
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left Section: Logo and Company Name */}
        <div
          style={{ position: "relative", bottom: "-7px" }}
          className="flex items-center space-x-4 px-10"
        >
          <img
            className="rounded-full h-20 w-20 shadow-lg"
            src={logo}
            alt="Tastssee Treasure Logo"
            style={{ height: "70px", width: "70px" }}
          />
          <div className="flex flex-col">
            <span className="logo-txt text-white text-xl font-bold tracking-wide">
              Tastssee Treasure
            </span>
            <span className="para text-white text-sm mt-1">
              Explore. Create. Taste.
            </span>
          </div>
        </div>

        {/* Right Section: Links */}
        <div className="mt-4 md:mt-0 flex flex-wrap space-x-10 text-sm ">
          <span>
            <Link
              to="/"
              className="text-white hover:text-yellow-300 transition px-3"
            >
              Home
            </Link>
            <Link
              to="/add-menu"
              className="text-white hover:text-yellow-300 transition px-3"
            >
              Add Menu
            </Link>
            <Link
              to="/search-menu"
              className="text-white hover:text-yellow-300 transition px-3"
            >
              Search Menu
            </Link>
            <Link
              to="/profile"
              className="text-white hover:text-yellow-300 transition px-3"
            >
              Your Recipes
            </Link>
          </span>
        </div>
        <p style={{ width: "500px" }} className="para mt-2 md:mt-0 relative text-sm text-white">
          &copy; 2023 Tastssee Treasure. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
